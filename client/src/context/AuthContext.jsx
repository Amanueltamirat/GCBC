import React, { createContext, useContext, useEffect, useState } from 'react';
import seedUsers from '../data/users';
import { sendMembershipDecisionEmail } from '../utils/membershipEmail';

const AuthContext = createContext();
const USERS_KEY = 'sbc_users';
const SESSION_KEY = 'sbc_user';

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : seedUsers;
  });

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  }, [user]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === USERS_KEY && e.newValue) setUsers(JSON.parse(e.newValue));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const signIn = (email, password) => {
    const match = users.find((u) => u.email === email && u.password === password);

    if (!match) return { ok: false, message: 'Invalid email or password.' };
    if (match.status === 'pending') {
      return { ok: false, message: 'Your registration is still pending admin approval.' };
    }
    if (match.status === 'rejected') {
      return { ok: false, message: 'Your registration was not approved. Contact the church office for details.' };
    }
    if (match.status === 'removed') {
      return { ok: false, message: 'This account is no longer active. Contact the church office if you believe this is a mistake.' };
    }

    const { password: _pw, ...safeUser } = match;
    setUser(safeUser);
    return { ok: true };
  };

  const signOut = () => setUser(null);

  const signUp = ({ name, email, password }) => {
    const existing = users.find((u) => u.email === email);
    const blocked = existing && (existing.status === 'pending' || existing.status === 'approved');

    if (blocked) {
      return {
        ok: false,
        message:
          existing.status === 'pending'
            ? 'An account with this email is already awaiting approval.'
            : 'An account with this email already exists — try signing in instead.',
      };
    }

    const newRecord = { name, email, password, role: 'member', status: 'pending' };
    setUsers((prev) => [...prev.filter((u) => u.email !== email), newRecord]);
    return { ok: true };
  };

  // --- Admin actions ---
  // Both of these are now async: the status change happens first and is
  // the source of truth (never rolled back), then a best-effort email goes
  // out. The returned object tells the caller whether the email actually
  // sent, so the UI can be honest about it instead of assuming success.
  const approveUser = async (email) => {
    const target = users.find((u) => u.email === email);
    setUsers((prev) => prev.map((u) => (u.email === email ? { ...u, status: 'approved' } : u)));

    if (!target) return { ok: true, emailSent: false };
    try {
      await sendMembershipDecisionEmail({ toEmail: target.email, toName: target.name, decision: 'approved' });
      return { ok: true, emailSent: true };
    } catch (err) {
      return { ok: true, emailSent: false, emailError: err.message };
    }
  };

  const rejectUser = async (email) => {
    const target = users.find((u) => u.email === email);
    setUsers((prev) => prev.map((u) => (u.email === email ? { ...u, status: 'rejected' } : u)));

    if (!target) return { ok: true, emailSent: false };
    try {
      await sendMembershipDecisionEmail({ toEmail: target.email, toName: target.name, decision: 'rejected' });
      return { ok: true, emailSent: true };
    } catch (err) {
      return { ok: true, emailSent: false, emailError: err.message };
    }
  };

  const removeUser = (email) =>
    setUsers((prev) =>
      prev.map((u) => (u.email === email && u.role !== 'admin' ? { ...u, status: 'removed' } : u))
    );

  const pendingUsers = users.filter((u) => u.status === 'pending');
  const activeMembers = users.filter((u) => u.status === 'approved' && u.role === 'member');

  const role = user?.role || 'guest';
  const isMember = role === 'member' || role === 'admin';
  const isAdmin = role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isMember,
        isAdmin,
        signIn,
        signOut,
        signUp,
        users,
        pendingUsers,
        activeMembers,
        approveUser,
        rejectUser,
        removeUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

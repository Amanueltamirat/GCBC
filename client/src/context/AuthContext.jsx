import React, { createContext, useContext, useEffect, useState } from 'react';
import seedUsers from '../data/users';

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

  // Keep multiple open tabs in sync — an admin approving/removing someone
  // in one tab should be reflected if that person is sitting on the sign-in
  // page in another tab. Mock-only nicety; a real backend makes this moot.
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
    // A previously rejected or removed person is welcome to try again —
    // only a currently pending or active account blocks a new signup.
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
  const approveUser = (email) =>
    setUsers((prev) => prev.map((u) => (u.email === email ? { ...u, status: 'approved' } : u)));

  const rejectUser = (email) =>
    setUsers((prev) => prev.map((u) => (u.email === email ? { ...u, status: 'rejected' } : u)));

  // Soft-remove, not a hard delete — keeps a record that this person was
  // once a member, which an admin may want later ("when did they leave?").
  // Deliberately can't be used on an admin account (see MembershipRequests.jsx,
  // which never renders a Remove button next to role === 'admin').
  const removeUser = (email) =>
    setUsers((prev) =>
      prev.map((u) => (u.email === email && u.role !== 'admin' ? { ...u, status: 'removed' } : u))
    );

  const pendingUsers = users.filter((u) => u.status === 'pending');
  const activeMembers = users.filter((u) => u.status === 'approved' && u.role === 'member');

  const role = user?.role || 'guest'; // 'guest' | 'member' | 'admin'
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

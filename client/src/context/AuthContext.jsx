import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import api, { getErrorMessage } from '../api/client';
import { sendMembershipDecisionEmail } from '../utils/membershipEmail';

const AuthContext = createContext();
const TOKEN_KEY = 'gcbc_token';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  // True until the initial "is this stored token still valid?" check
  // resolves. Routes must wait for this before deciding whether to
  // redirect to sign-in — otherwise a signed-in admin briefly gets bounced
  // to /signin on every page refresh before their session loads.
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoadingUser(false);
      return;
    }
    // Don't just trust whatever was last saved — a token can expire, or
    // an admin could have removed this account, since this browser was
    // last open. Re-verify against the server.
    api
      .get('/auth/profile')
      .then(({ data }) => setUser({ ...data, token }))
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
      })
      .finally(() => setLoadingUser(false));
  }, []);

  const fetchUsers = useCallback(async () => {
    if (user?.role !== 'admin') {
      setUsers([]);
      return;
    }
    try {
      const { data } = await api.get('/admin/users');
      setUsers(data);
    } catch {
      setUsers([]);
    }
  }, [user]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const signIn = async (email, password) => {
    try {
      const { data } = await api.post('/auth/signin', { email, password });
      localStorage.setItem(TOKEN_KEY, data.token);
      setUser(data);
      return { ok: true };
    } catch (err) {
      return { ok: false, message: getErrorMessage(err) };
    }
  };

  const signOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setUsers([]);
  };

  const signUp = async ({ name, email, password }) => {
    try {
      await api.post('/auth/signup', { name, email, password });
      return { ok: true };
    } catch (err) {
      return { ok: false, message: getErrorMessage(err) };
    }
  };


  const approveUser = async (id) => {
    let target;
    try {
      const { data } = await api.put(`/admin/users/${id}/approve`);
      target = data;
      await fetchUsers();
    } catch (err) {
      return { ok: false, emailSent: false, message: getErrorMessage(err) };
    }
    try {
      await sendMembershipDecisionEmail({ toEmail: target.email, toName: target.name, decision: 'approved' });
      return { ok: true, emailSent: true };
    } catch (err) {
      return { ok: true, emailSent: false, emailError: err.message };
    }
  };

  const rejectUser = async (id) => {
    let target;
    try {
      const { data } = await api.put(`/admin/users/${id}/reject`);
      target = data;
      await fetchUsers();
    } catch (err) {
      return { ok: false, emailSent: false, message: getErrorMessage(err) };
    }
    try {
      await sendMembershipDecisionEmail({ toEmail: target.email, toName: target.name, decision: 'rejected' });
      return { ok: true, emailSent: true };
    } catch (err) {
      return { ok: true, emailSent: false, emailError: err.message };
    }
  };

  const removeUser = async (id) => {
    try {
      await api.put(`/admin/users/${id}/remove`);
      await fetchUsers();
      return { ok: true };
    } catch (err) {
      return { ok: false, message: getErrorMessage(err) };
    }
  };

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
        loadingUser,
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

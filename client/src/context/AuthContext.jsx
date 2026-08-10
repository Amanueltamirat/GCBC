import React, { createContext, useContext, useEffect, useState } from 'react';
import users from '../data/users';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('sbc_user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('sbc_user', JSON.stringify(user));
    else localStorage.removeItem('sbc_user');
  }, [user]);

  const signIn = (email, password) => {
    const match = users.find((u) => u.email === email && u.password === password);
    if (!match) return { ok: false, message: 'Invalid email or password.' };
    const { password: _pw, ...safeUser } = match;
    setUser(safeUser);
    return { ok: true };
  };

  const signOut = () => setUser(null);

  const role = user?.role || 'guest'; // 'guest' | 'member' | 'admin'
  const isMember = role === 'member' || role === 'admin';
  const isAdmin = role === 'admin';

  return (
    <AuthContext.Provider value={{ user, role, isMember, isAdmin, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

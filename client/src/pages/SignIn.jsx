import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  if (user) {
    navigate(from, { replace: true });
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = signIn(email, password);
    if (result.ok) navigate(from, { replace: true });
    else setError(result.message);
  };

  const fillDemo = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="mx-auto max-w-md px-5 py-20">
      <Helmet><title>Sign In · Soddo Baptist Church</title></Helmet>
      <h1 className="text-3xl font-extrabold text-ink mb-2">Sign In</h1>
      <p className="text-muted mb-8">
        This is a front-end demo — no real backend yet. Use one of the demo accounts below.
      </p>

      <div className="mb-6 flex flex-col gap-2 rounded-lg border border-border bg-paper-2 p-4 text-sm">
        <p className="font-semibold text-ink">Demo accounts</p>
        <button type="button" onClick={() => fillDemo('admin@sbc.org', 'admin123')} className="text-left text-accent hover:underline">
          Admin — admin@sbc.org / admin123
        </button>
        <button type="button" onClick={() => fillDemo('member@sbc.org', 'member123')} className="text-left text-accent hover:underline">
          Member — member@sbc.org / member123
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        {error && (
          <p role="alert" className="rounded-md bg-accent/10 text-accent-dark text-sm px-4 py-2.5">
            {error}
          </p>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink mb-1">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-border px-4 py-2.5 outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-ink mb-1">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-border px-4 py-2.5 outline-none focus:border-accent"
          />
        </div>
        <button type="submit" className="rounded-md bg-accent px-6 py-2.5 font-semibold text-white hover:bg-accent-dark">
          Sign In
        </button>
      </form>

      <p className="mt-6 text-sm text-muted">
        <Link to="/" className="text-accent hover:underline">← Back to home</Link>
      </p>
    </div>
  );
}

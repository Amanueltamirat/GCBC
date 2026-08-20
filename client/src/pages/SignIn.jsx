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
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    navigate(from, { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const result = await signIn(email, password);
    setSubmitting(false);
    if (result.ok) navigate(from, { replace: true });
    else setError(result.message);
  };

  return (
    <div className="mx-auto max-w-md px-5 py-20">
      <Helmet><title>Sign In · Soddo Baptist Church</title></Helmet>
      <h1 className="text-3xl font-extrabold text-ink mb-8">Sign In</h1>

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
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-accent px-6 py-2.5 font-semibold text-white hover:bg-accent-dark disabled:opacity-60"
        >
          {submitting ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      <p className="mt-6 text-sm text-muted flex flex-col gap-1">
        <span>New here? <Link to="/signup" className="text-accent hover:underline">Create an account</Link></span>
        <Link to="/" className="text-accent hover:underline">← Back to home</Link>
      </p>
    </div>
  );
}

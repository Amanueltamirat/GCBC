import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    const result = signUp({ name, email, password });
    if (result.ok) {
      setSubmitted(true);
    } else {
      setError(result.message);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-md px-5 py-24 text-center">
        <Helmet><title>Registration Received · Soddo Baptist Church</title></Helmet>
        <CheckCircle2 className="mx-auto text-accent mb-4" size={40} />
        <h1 className="text-2xl font-extrabold text-ink mb-2">Registration received</h1>
        <p className="text-muted mb-6">
          An admin needs to approve your account before you can sign in. We'll let you know
          once that's done.
        </p>
        <Link to="/" className="text-accent hover:underline">← Back to home</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-5 py-20">
      <Helmet><title>Sign Up · Soddo Baptist Church</title></Helmet>
      <h1 className="text-3xl font-extrabold text-ink mb-2">Create an Account</h1>
      <p className="text-muted mb-8">
        New accounts require admin approval before you can sign in — this keeps the members
        area limited to actual members of the congregation.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        {error && (
          <p role="alert" className="rounded-md bg-accent/10 text-accent-dark text-sm px-4 py-2.5">
            {error}
          </p>
        )}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-ink mb-1">Full name</label>
          <input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-border px-4 py-2.5 outline-none focus:border-accent"
          />
        </div>
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
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-border px-4 py-2.5 outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-ink mb-1">Confirm password</label>
          <input
            id="confirmPassword"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-md border border-border px-4 py-2.5 outline-none focus:border-accent"
          />
        </div>
        <button type="submit" className="rounded-md bg-accent px-6 py-2.5 font-semibold text-white hover:bg-accent-dark">
          Request an Account
        </button>
      </form>

      <p className="mt-6 text-sm text-muted">
        Already have an account? <Link to="/signin" className="text-accent hover:underline">Sign in</Link>
      </p>
    </div>
  );
}

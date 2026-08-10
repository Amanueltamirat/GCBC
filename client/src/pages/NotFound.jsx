import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-content px-5 py-32 text-center">
      <h1 className="text-4xl font-extrabold text-ink mb-3">Page not found</h1>
      <p className="text-muted mb-6">The page you're looking for doesn't exist.</p>
      <Link to="/" className="font-semibold text-accent hover:underline">← Back to home</Link>
    </div>
  );
}

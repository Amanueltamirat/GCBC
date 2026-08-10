import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LINKS = [
  { to: '/sermons', label: 'Sermons' },
  { to: '/articles', label: 'Articles' },
  { to: '/books', label: 'Books' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

function navClass({ isActive }) {
  return `text-sm font-medium px-1 py-2 border-b-2 transition-colors ${
    isActive ? 'border-accent text-ink' : 'border-transparent text-muted hover:text-ink'
  }`;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isMember, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-paper border-b border-border">
      <div className="mx-auto max-w-content px-5 sm:px-8 h-24 flex items-center justify-between">
        {/* <Link to="/" className="font-extrabold text-lg tracking-tight text-ink">
        </Link> */}
        <Link to={'/'} className='h-full'>
          <img src="/logo.jpg" alt="GCBC-logo" className='h-26 -my-2' />
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-6">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={navClass}>
              {l.label}
            </NavLink>
          ))}
          {isMember && (
            <NavLink to="/members" className={navClass}>
              Members
            </NavLink>
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-muted">{user.name}</span>
              <button
                onClick={signOut}
                className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-ink hover:bg-paper-2"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className="rounded-md bg-accent px-4 py-1.5 text-sm font-semibold text-white hover:bg-accent-dark"
            >
              Sign In
            </Link>
          )}
        </div>

        <button
          className="lg:hidden text-ink"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav aria-label="Mobile" className="lg:hidden border-t border-border bg-paper px-5 py-4 flex flex-col gap-1">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-ink hover:bg-paper-2"
            >
              {l.label}
            </NavLink>
          ))}
          {isMember && (
            <NavLink to="/members" onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-ink hover:bg-paper-2">
              Members
            </NavLink>
          )}
          <div className="h-px bg-border my-2" />
          {user ? (
            <button
              onClick={() => {
                signOut();
                setOpen(false);
              }}
              className="rounded-md px-3 py-2.5 text-left text-ink hover:bg-paper-2"
            >
              Sign Out
            </button>
          ) : (
            <NavLink to="/signin" onClick={() => setOpen(false)} className="rounded-md bg-accent px-3 py-2.5 text-center font-semibold text-white">
              Sign In
            </NavLink>
          )}
        </nav>
      )}
    </header>
  );
}

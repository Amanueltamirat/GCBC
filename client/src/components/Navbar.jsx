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
  return `text-lg font-medium px-1 py-2 border-b-2 transition-colors ${
    isActive ? 'border-accent text-ink' : 'border-transparent text-muted hover:text-ink'
  }`;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isMember, isAdmin, signOut, pendingUsers } = useAuth();
  const pendingCount = pendingUsers?.length || 0;

  return (
    <header className="sticky top-0 z-40 bg-paper border-b border-border">
      <div className="mx-auto max-w-content px-5 sm:px-8 h-24 flex items-center justify-between">
        <Link to={'/'} className='h-full'>
          <img src="/logo.jpg" alt="GCBC-logo" className='h-24' />
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
          {isAdmin && (
            <NavLink to="/admin/members" className={navClass}>
              <span className="flex items-center gap-1.5">
                Manage Members
                {pendingCount > 0 && (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-white">
                    {pendingCount}
                  </span>
                )}
              </span>
            </NavLink>
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-lg text-muted">{user.name}</span>
              <button
                onClick={signOut}
                className="cursor-pointer rounded-md border border-border px-3 py-1.5 text-sm font-medium text-ink hover:bg-paper-2"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="text-sm font-medium text-ink hover:text-accent">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="rounded-md bg-accent px-4 py-1.5 text-sm font-semibold text-white hover:bg-accent-dark"
              >
                Sign Up
              </Link>
            </>
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
          {isAdmin && (
            <NavLink to="/admin/members" onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-ink hover:bg-paper-2">
              Manage Members {pendingCount > 0 && `(${pendingCount})`}
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
            <>
              <NavLink to="/signin" onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-ink hover:bg-paper-2">
                Sign In
              </NavLink>
              <NavLink to="/signup" onClick={() => setOpen(false)} className="rounded-md bg-accent px-3 py-2.5 text-center font-semibold text-white">
                Sign Up
              </NavLink>
            </>
          )}
        </nav>
      )}
    </header>
  );
}

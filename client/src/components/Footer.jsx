import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Navigation } from 'lucide-react';
import socialLinks from '../data/socialLinks';

const EXPLORE_LINKS = [
  { to: '/sermons', label: 'Sermons' },
  { to: '/articles', label: 'Articles' },
  { to: '/books', label: 'Books' },
  { to: '/about', label: 'About' },
  { to: '/members', label: 'Members' },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="mx-auto max-w-content px-5 sm:px-8 py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <p className="font-extrabold text-lg text-white mb-2">Grace Community Baptist Church</p>
          <p className="text-sm leading-relaxed">
            Wolaita Soddo, Ethiopia — a reformed Baptist congregation subscribing to the 1689
            London Baptist Confession.
          </p>
          <div className="flex gap-2.5 mt-5">
            {socialLinks.map(({ name, url, Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Soddo Baptist Church on ${name}`}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white hover:bg-accent transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <nav aria-label="Footer">
          <p className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Explore</p>
          <ul className="flex flex-col gap-2.5 text-sm">
            {EXPLORE_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-accent transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Visit */}
        <div>
          <p className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Visit Us</p>
          <div className="flex items-start gap-2.5 text-sm mb-3">
            <Clock size={16} className="mt-0.5 shrink-0 text-accent" />
            <span>Sundays at 9:00 AM</span>
          </div>
          <div className="flex items-start gap-2.5 text-sm">
            <Navigation size={16} className="mt-0.5 shrink-0 text-accent" />
            <Link to="/contact" className="hover:text-accent transition-colors">
              Wolaita Soddo — get directions
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Contact</p>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>+251 92 888 4393</li>
            <li className="break-all">Perfecttesfa456@gmail.com</li>
            <li>
              <Link to="/contact" className="text-accent hover:underline font-medium">
                Send a message →
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="text-center text-xs text-white/50 py-6">
          © {new Date().getFullYear()} Soddo Baptist Church. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

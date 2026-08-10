import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-paper-2 mt-20">
      <div className="mx-auto max-w-content px-5 sm:px-8 py-12 grid gap-8 sm:grid-cols-3">
        <div>
          <p className="font-extrabold text-ink mb-2">Grace Community Baptist Church</p>
          <p className="text-sm text-muted">
            Wolaita Soddo, Ethiopia
            <br />A reformed Baptist congregation subscribing to the 1689 London Baptist Confession.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="text-sm font-semibold text-ink mb-2">Explore</p>
          <ul className="flex flex-col gap-1.5 text-sm text-muted">
            <li><Link className="hover:text-accent" to="/sermons">Sermons</Link></li>
            <li><Link className="hover:text-accent" to="/articles">Articles</Link></li>
            <li><Link className="hover:text-accent" to="/books">Books</Link></li>
            <li><Link className="hover:text-accent" to="/about">About</Link></li>
          </ul>
        </nav>
        <div>
          <p className="text-sm font-semibold text-ink mb-2">Contact</p>
          <ul className="flex flex-col gap-1.5 text-sm text-muted">
            <li>+251 92 888 4393</li>
            <li>Perfecttesfa456@gmail.com</li>
            <li><Link className="hover:text-accent" to="/contact">Get directions</Link></li>
          </ul>
        </div>
      </div>
      <p className="text-center text-xs text-muted pb-6">
        © {new Date().getFullYear()} Soddo Baptist Church. All rights reserved.
      </p>
    </footer>
  );
}

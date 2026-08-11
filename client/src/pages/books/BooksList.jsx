import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Plus } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { useAuth } from '../../context/AuthContext';

export default function BooksList() {
  const { books } = useContent();
  const { isAdmin } = useAuth();

  return (
    <div>
      <Helmet><title>Books · GCBC</title></Helmet>

      {/* Hero */}
      <section
        className="relative flex min-h-[320px] items-end bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <div className="relative mx-auto max-w-content w-full px-5 sm:px-8 pb-12 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-accent font-semibold tracking-wide uppercase text-sm mb-3">
              Recommended reading
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold">Books</h1>
            <p className="mt-2 text-white/80 max-w-md">
              A shared library, curated for growth and study.
            </p>
          </div>
          {isAdmin && (
            <Link
              to="/books/new"
              className="flex items-center gap-1.5 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark"
            >
              <Plus size={16} /> New Book
            </Link>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-content px-5 sm:px-8 py-12">
        {books.length === 0 ? (
          <p className="text-muted">No books yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {books.map((book) => (
              <Link
                key={book.id}
                to={`/books/${book.id}`}
                className="group rounded-lg overflow-hidden border border-border hover:shadow-md transition-shadow"
              >
                <img src={book.cover} alt="" className="h-56 w-full object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-ink leading-snug group-hover:text-accent">{book.title}</h3>
                  <p className="mt-1 text-sm text-muted">{book.author}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useContent } from '../../context/ContentContext';
import { useAuth } from '../../context/AuthContext';
import PageHeader from '../../components/PageHeader';

export default function BooksList() {
  const { books } = useContent();
  const { isAdmin } = useAuth();

  return (
    <div>
      <Helmet><title>Books · Soddo Baptist Church</title></Helmet>
      <PageHeader
        title="Books"
        subtitle="Recommended reading from our library."
        cta={isAdmin ? { to: '/books/new', label: 'New Book' } : null}
      />

      <div className="mx-auto max-w-content px-5 sm:px-8 pb-16">
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

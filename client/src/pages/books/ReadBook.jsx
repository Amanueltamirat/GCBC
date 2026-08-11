import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Download } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export default function ReadBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getById } = useContent();
  const book = getById('books', id);

  if (!book) {
    return (
      <div className="mx-auto max-w-content px-5 py-20 text-center">
        <p className="text-muted">Book not found.</p>
        <Link to="/books" className="text-accent hover:underline">← Back to Books</Link>
      </div>
    );
  }

  if (!book.readUrl) {
    return (
      <div className="mx-auto max-w-content px-5 py-20 text-center">
        <p className="text-muted">This book isn't available to read online yet.</p>
        <Link to={`/books/${id}`} className="text-accent hover:underline">← Back to {book.title}</Link>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-ink">
      <Helmet><title>Reading: {book.title}</title></Helmet>

      <header className="flex items-center justify-between gap-4 px-5 py-3 bg-ink text-white border-b border-white/10">
        <button
          onClick={() => navigate(`/books/${id}`)}
          className="flex items-center gap-1.5 text-sm font-medium hover:text-accent"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <p className="font-semibold text-sm truncate max-w-[50vw]">{book.title}</p>
        {book.downloadUrl ? (
          <a
            href={book.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium hover:text-accent"
          >
            <Download size={16} /> Download
          </a>
        ) : (
          <span className="w-16" aria-hidden="true" />
        )}
      </header>

      <iframe title={book.title} src={book.readUrl} className="flex-1 w-full bg-white" />
    </div>
  );
}

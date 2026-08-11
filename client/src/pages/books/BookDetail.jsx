import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Pencil, Trash2, BookOpenText, Download } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { useAuth } from '../../context/AuthContext';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getById, remove } = useContent();
  const { isAdmin } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const book = getById('books', id);

  if (!book) {
    return (
      <div className="mx-auto max-w-content px-5 py-20 text-center">
        <p className="text-muted">Book not found.</p>
        <Link to="/books" className="text-accent hover:underline">← Back to Books</Link>
      </div>
    );
  }

  const handleDelete = () => {
    remove('books', book.id);
    setShowModal(false);
    navigate('/books');
  };

  return (
    <div className="mx-auto max-w-content px-5 sm:px-8 py-12">
      <Helmet><title>{book.title} · Soddo Baptist Church</title></Helmet>

      <div className="grid gap-10 sm:grid-cols-[280px_1fr]">
        <img src={book.cover} alt="" className="w-full rounded-lg shadow-md" />
        <div>
          <h1 className="text-3xl font-extrabold text-ink mb-1">{book.title}</h1>
          <p className="text-muted mb-6">by {book.author}</p>
          <p className="text-ink/80 leading-relaxed mb-8">{book.overview}</p>

          <div className="flex flex-wrap gap-3">
            {book.readUrl ? (
              <Link
                to={`/books/${book.id}/read`}
                className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-semibold text-white hover:bg-accent-dark"
              >
                <BookOpenText size={18} /> Read Online
              </Link>
            ) : (
              <span
                title="Not available online yet"
                className="inline-flex items-center gap-2 rounded-md bg-border px-5 py-2.5 font-semibold text-muted cursor-not-allowed"
              >
                <BookOpenText size={18} /> Read Online
              </span>
            )}

            {book.downloadUrl ? (
              <a
                href={book.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 font-semibold text-ink hover:bg-paper-2"
              >
                <Download size={18} /> Download
              </a>
            ) : (
              <span
                title="Not available for download yet"
                className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 font-semibold text-muted cursor-not-allowed"
              >
                <Download size={18} /> Download
              </span>
            )}
          </div>

          {!book.readUrl && !book.downloadUrl && (
            <p className="text-sm text-muted mt-3">
              This title isn't available to read or download online yet.
            </p>
          )}

          {isAdmin && (
            <div className="mt-10 flex gap-3 pt-8 border-t border-border">
              <button
                onClick={() => navigate(`/books/${book.id}/edit`)}
                className="flex items-center gap-1.5 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-ink/90"
              >
                <Pencil size={15} /> Edit
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1.5 rounded-md border border-accent/40 px-4 py-2 text-sm font-semibold text-accent hover:bg-accent/5"
              >
                <Trash2 size={15} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={showModal}
        title="Delete this book?"
        body="This action can't be undone."
        onConfirm={handleDelete}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}

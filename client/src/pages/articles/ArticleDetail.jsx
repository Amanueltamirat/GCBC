import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Pencil, Trash2 } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { useAuth } from '../../context/AuthContext';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getById, remove } = useContent();
  const { isAdmin } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const article = getById('articles', id);

  if (!article) {
    return (
      <div className="mx-auto max-w-content px-5 py-20 text-center">
        <p className="text-muted">Article not found.</p>
        <Link to="/articles" className="text-accent hover:underline">← Back to Articles</Link>
      </div>
    );
  }

  const handleDelete = () => {
    remove('articles', article.id);
    setShowModal(false);
    navigate('/articles');
  };

  return (
    <article className="mx-auto max-w-2xl px-5 sm:px-8 py-12">
      <Helmet><title>{article.title} · Soddo Baptist Church</title></Helmet>

      <p className="text-sm text-muted">{article.date}</p>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-ink mt-1 mb-6">{article.title}</h1>
      <img src={article.image} alt="" className="w-full rounded-lg mb-8" />
      <p className="text-sm font-semibold text-ink mb-6">By {article.author}</p>
      <p className="text-ink/80 leading-relaxed">{article.content}</p>

      {isAdmin && (
        <div className="mt-10 flex gap-3 pt-8 border-t border-border">
          <button
            onClick={() => navigate(`/articles/${article.id}/edit`)}
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

      <ConfirmDialog
        open={showModal}
        title="Delete this article?"
        body="This action can't be undone."
        onConfirm={handleDelete}
        onCancel={() => setShowModal(false)}
      />
    </article>
  );
}

import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Pencil, Trash2 } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { useAuth } from '../../context/AuthContext';
import { PLACEHOLDER_YOUTUBE_ID } from '../../data/sermons';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function SermonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getById, remove } = useContent();
  const { isAdmin } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const sermon = getById('sermons', id);

  if (!sermon) {
    return (
      <div className="mx-auto max-w-content px-5 py-20 text-center">
        <p className="text-muted">Sermon not found.</p>
        <Link to="/sermons" className="text-accent hover:underline">← Back to Sermons</Link>
      </div>
    );
  }

  const hasVideo = sermon.youtubeId !== PLACEHOLDER_YOUTUBE_ID;

  const handleDelete = () => {
    remove('sermons', sermon.id);
    setShowModal(false);
    navigate('/sermons');
  };

  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8 py-12">
      <Helmet><title>{sermon.title} · Soddo Baptist Church</title></Helmet>

      <p className="text-accent text-sm font-semibold uppercase">{sermon.series}</p>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-ink mt-1 mb-2">{sermon.title}</h1>
      <p className="text-muted mb-8">{sermon.preacher} · {sermon.scripture} · {sermon.date}</p>

      <div className="aspect-video rounded-lg overflow-hidden bg-ink mb-8">
        {hasVideo ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${sermon.youtubeId}`}
            title={sermon.title}
            allowFullScreen
          />
        ) : (
          <div className="flex h-full items-center justify-center text-white/50 text-sm">
            Video coming soon
          </div>
        )}
      </div>

      <p className="text-ink/80 leading-relaxed">{sermon.description}</p>

      {isAdmin && (
        <div className="mt-10 flex gap-3 pt-8 border-t border-border">
          <button
            onClick={() => navigate(`/sermons/${sermon.id}/edit`)}
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
        title="Delete this sermon?"
        body="This action can't be undone."
        onConfirm={handleDelete}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}

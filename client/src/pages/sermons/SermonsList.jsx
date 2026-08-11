import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PlayCircle } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { useAuth } from '../../context/AuthContext';
import { PLACEHOLDER_YOUTUBE_ID } from '../../data/sermons';
import PageHeader from '../../components/PageHeader';

export default function SermonsList() {
  const { sermons } = useContent();
  const { isAdmin } = useAuth();

  return (
    <div>
      <Helmet><title>Sermons · GCBC</title></Helmet>
      <PageHeader
        title="Sermons"
        subtitle="Audio and video messages from Sunday gatherings."
        cta={isAdmin ? { to: '/sermons/new', label: 'New Sermon' } : null}
      />

      <div className="mx-auto max-w-content px-5 sm:px-8 pb-16">
        {sermons.length === 0 ? (
          <p className="text-muted">No sermons yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sermons.map((sermon) => {
              const hasVideo = sermon.youtubeId !== PLACEHOLDER_YOUTUBE_ID;
              return (
                <Link
                  key={sermon.id}
                  to={`/sermons/${sermon.id}`}
                  className="group rounded-lg overflow-hidden border border-border hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-video bg-ink flex items-center justify-center">
                    {hasVideo ? (
                      <img
                        src={`https://img.youtube.com/vi/${sermon.youtubeId}/hqdefault.jpg`}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-white/50 text-sm">Video coming soon</span>
                    )}
                    <PlayCircle
                      className="absolute text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      size={44}
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-accent text-xs font-semibold uppercase">{sermon.series}</p>
                    <h3 className="font-bold text-ink mt-1 leading-snug">{sermon.title}</h3>
                    <p className="text-sm text-muted mt-1">{sermon.preacher} · {sermon.date}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

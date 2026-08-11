import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PlayCircle, Plus } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { useAuth } from '../../context/AuthContext';
import { PLACEHOLDER_YOUTUBE_ID } from '../../data/sermons';

export default function SermonsList() {
  const { sermons } = useContent();
  const { isAdmin } = useAuth();

  return (
    <div>
      <Helmet><title>Sermons · GCBC</title></Helmet>

      {/* Hero */}
      <section
        className="relative flex min-h-[320px] items-end bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <div className="relative mx-auto max-w-content w-full px-5 sm:px-8 pb-12 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-accent font-semibold tracking-wide uppercase text-sm mb-3">
              Audio & video
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold">Sermons</h1>
            <p className="mt-2 text-white/80 max-w-md">
              Messages from Sunday gatherings, preached from the Word.
            </p>
          </div>
          {isAdmin && (
            <Link
              to="/sermons/new"
              className="flex items-center gap-1.5 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark"
            >
              <Plus size={16} /> New Sermon
            </Link>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-content px-5 sm:px-8 py-12">
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

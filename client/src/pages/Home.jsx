import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PlayCircle, MapPin, Clock } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { PLACEHOLDER_YOUTUBE_ID } from '../data/sermons';
import HeroSlider from '../components/HeroSlider';

// Swap these for real photos of the church/congregation whenever you have
// them — HeroSlider just needs an array of image URLs.
const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1600&q=80',
  'https://images.unsplash.com/photo-1523803326055-13445f07b17a?w=1600&q=80',
  'https://images.unsplash.com/photo-1478147427282-58a87a120781?w=1600&q=80',
];
const HERO_ALT_TEXTS = [
  'Congregation gathered inside the sanctuary',
  'Sunlight through the sanctuary windows',
  'Members greeting one another after service',
];

export default function Home() {
  const { sermons, articles } = useContent();
  const latestSermon = sermons[0];
  const latestArticles = articles.slice(0, 3);
  const hasRealVideo = latestSermon && latestSermon.youtubeId !== PLACEHOLDER_YOUTUBE_ID;

  return (
    <>
      <Helmet><title>Soddo Baptist Church</title></Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden text-white min-h-140 flex items-center">
        <HeroSlider images={HERO_IMAGES} altTexts={HERO_ALT_TEXTS} />
       
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/70 to-ink/40 z-1" />

        <div className="relative z-10 mx-auto max-w-content px-5 sm:px-8 py-20 sm:py-28">
          <p className="text-accent font-semibold tracking-wide uppercase text-sm mb-4">
            Wolaita Soddo, Ethiopia
          </p>
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight max-w-2xl">
            A church built on the Word, gathered in Soddo.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/80">
            Join us Sunday mornings as we worship, study Scripture together, and grow as a
            community devoted to Christ.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/about"
              className="rounded-md bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-dark"
            >
              Plan Your Visit
            </Link>
            <Link
              to="/sermons"
              className="flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              <PlayCircle size={20} /> Watch Latest Sermon
            </Link>
          </div>
        </div>
      </section>

      {/* Service info strip */}
      <section className="bg-paper-2 border-b border-border">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-6 flex flex-wrap gap-8">
          <div className="flex items-center gap-3">
            <Clock className="text-accent" size={22} />
            <div>
              <p className="font-semibold text-ink text-sm">Sunday Service</p>
              <p className="text-sm text-muted">9:00 AM — Soddo Baptist Church</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="text-accent" size={22} />
            <div>
              <p className="font-semibold text-ink text-sm">Location</p>
              <Link to="/contact" className="text-sm text-muted hover:text-accent">
                Wolaita Soddo — get directions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest sermon */}
      {latestSermon && (
        <section className="mx-auto max-w-content px-5 sm:px-8 py-16">
          <h2 className="text-2xl font-extrabold text-ink mb-6">Latest Sermon</h2>
          <div className="grid gap-8 sm:grid-cols-2 items-center">
            <div className="aspect-video rounded-lg overflow-hidden bg-ink">
              {hasRealVideo ? (
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${latestSermon.youtubeId}`}
                  title={latestSermon.title}
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full items-center justify-center text-white/60 text-sm">
                  Video coming soon
                </div>
              )}
            </div>
            <div>
              <p className="text-accent text-sm font-semibold">{latestSermon.series}</p>
              <h3 className="text-2xl font-bold text-ink mt-1">{latestSermon.title}</h3>
              <p className="text-muted mt-2">{latestSermon.description}</p>
              <p className="text-sm text-muted mt-3">
                {latestSermon.preacher} · {latestSermon.scripture}
              </p>
              <Link to={`/sermons/${latestSermon.id}`} className="inline-block mt-4 font-semibold text-accent hover:underline">
                Watch full sermon →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Latest articles */}
      <section className="bg-paper-2 border-t border-border">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-16">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-extrabold text-ink">Recent Articles</h2>
            <Link to="/articles" className="text-sm font-semibold text-accent hover:underline">
              View all
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {latestArticles.map((article) => (
              <Link
                key={article.id}
                to={`/articles/${article.id}`}
                className="group rounded-lg bg-paper overflow-hidden border border-border hover:shadow-md transition-shadow"
              >
                <img src={article.image} alt="" className="h-40 w-full object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-ink leading-snug group-hover:text-accent">{article.title}</h3>
                  <p className="mt-1 text-sm text-muted line-clamp-2">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

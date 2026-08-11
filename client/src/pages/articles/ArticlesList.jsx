import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Plus } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { useAuth } from '../../context/AuthContext';

export default function ArticlesList() {
  const { articles } = useContent();
  const { isAdmin } = useAuth();

  return (
    <div>
      <Helmet><title>Articles · GCBC</title></Helmet>

      {/* Hero */}
      <section
        className="relative flex min-h-[320px] items-end bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <div className="relative mx-auto max-w-content w-full px-5 sm:px-8 pb-12 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-accent font-semibold tracking-wide uppercase text-sm mb-3">
              Teaching & reflection
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold">Articles</h1>
            <p className="mt-2 text-white/80 max-w-md">
              Writing from our pastors and members on faith and everyday life.
            </p>
          </div>
          {isAdmin && (
            <Link
              to="/articles/new"
              className="flex items-center gap-1.5 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark"
            >
              <Plus size={16} /> New Article
            </Link>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-content px-5 sm:px-8 py-12">
        {articles.length === 0 ? (
          <p className="text-muted">No articles yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/articles/${article.id}`}
                className="group rounded-lg overflow-hidden border border-border hover:shadow-md transition-shadow"
              >
                <img src={article.image} alt="" className="h-44 w-full object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-ink leading-snug group-hover:text-accent">{article.title}</h3>
                  <p className="mt-1 text-sm text-muted line-clamp-2">{article.excerpt}</p>
                  <p className="mt-3 text-xs text-muted">{article.author} · {article.date}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

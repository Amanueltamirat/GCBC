import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useContent } from '../../context/ContentContext';
import { useAuth } from '../../context/AuthContext';
import PageHeader from '../../components/PageHeader';

export default function ArticlesList() {
  const { articles } = useContent();
  const { isAdmin } = useAuth();

  return (
    <div>
      <Helmet><title>Articles · GCBC</title></Helmet>
      <PageHeader
        title="Articles"
        subtitle="Teaching and reflection from our pastors and members."
        cta={isAdmin ? { to: '/articles/new', label: 'New Article' } : null}
      />

      <div className="mx-auto max-w-content px-5 sm:px-8 pb-16">
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

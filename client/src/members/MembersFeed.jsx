import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Plus } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';
import MemberPostCard from './MemberPostCard';

export default function MembersFeed() {
  const { user, isAdmin } = useAuth();
  const { memberPosts } = useContent();

  return (
    <div>
      <Helmet><title>Members · Soddo Baptist Church</title></Helmet>

      {/* Hero */}
      <section
        className="relative flex min-h-80 items-end bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/70 to-ink/30" />
        <div className="relative mx-auto max-w-content w-full px-5 sm:px-8 pb-12 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-accent font-semibold tracking-wide uppercase text-sm mb-3">
              Members Only
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold">
              Welcome back, {user?.name?.split(' ')[0]}
            </h1>
            <p className="mt-2 text-white/80 max-w-md">
              Newsletters, updates, and announcements for the congregation.
            </p>
          </div>
          {isAdmin && (
            <Link
              to="/members/new"
              className="flex items-center gap-1.5 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark"
            >
              <Plus size={16} /> New Post
            </Link>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-5 sm:px-8 py-12 flex flex-col gap-6">
        {memberPosts.length === 0 ? (
          <p className="text-muted">No posts yet.</p>
        ) : (
          memberPosts.map((post) => <MemberPostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}

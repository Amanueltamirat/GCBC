import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';
import PageHeader from '../components/PageHeader';
import MemberPostCard from './MemberPostCard';

export default function MembersFeed() {
  const { user, isAdmin } = useAuth();
  const { memberPosts } = useContent();

  return (
    <div>
      <Helmet><title>Members · GCBC</title></Helmet>

      <PageHeader
        title={`Welcome back, ${user?.name?.split(' ')[0]}`}
        subtitle="Newsletters, updates, and announcements for the congregation."
        cta={isAdmin ? { to: '/members/new', label: 'New Post' } : null}
      />

      <div className="mx-auto max-w-2xl px-5 sm:px-8 pb-16 flex flex-col gap-6">
        {memberPosts.length === 0 ? (
          <p className="text-muted">No posts yet.</p>
        ) : (
          memberPosts.map((post) => <MemberPostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}

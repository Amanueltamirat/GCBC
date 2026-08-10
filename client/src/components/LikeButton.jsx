import React from 'react';
import { Heart } from 'lucide-react';

export default function LikeButton({ liked, count, onToggle, disabled }) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={liked}
      aria-label={liked ? 'Unlike this post' : 'Like this post'}
      title={disabled ? 'Sign in to like posts' : undefined}
      className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
        liked ? 'text-accent' : 'text-muted hover:text-ink'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <Heart size={17} fill={liked ? 'currentColor' : 'none'} />
      {count > 0 ? count : ''} {count === 1 ? 'Like' : 'Likes'}
    </button>
  );
}

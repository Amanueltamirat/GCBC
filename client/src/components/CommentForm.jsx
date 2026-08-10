import React, { useState } from 'react';

export default function CommentForm({ onSubmit, placeholder = 'Write a comment…', submitLabel = 'Post', autoFocus }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label htmlFor={`comment-${placeholder}`} className="sr-only">
        {placeholder}
      </label>
      <textarea
        id={`comment-${placeholder}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        rows={2}
        autoFocus={autoFocus}
        className="w-full rounded-md border border-border px-3 py-2 text-sm outline-none focus:border-accent"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="self-start rounded-md bg-ink px-3 py-1.5 text-xs font-semibold text-white hover:bg-ink/90 disabled:opacity-40"
      >
        {submitLabel}
      </button>
    </form>
  );
}

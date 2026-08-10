import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

export default function PageHeader({ eyebrow, title, cta }) {
  return (
    <div className="mx-auto max-w-content px-5 sm:px-8 pt-10 pb-8 flex items-end justify-between gap-4 flex-wrap">
      <div>
        <span className="verse-mark">{eyebrow}</span>
        <h1 className="font-display text-4xl text-ink">{title}</h1>
      </div>
      {cta && (
        <Link
          to={cta.to}
          className="flex items-center gap-1.5 rounded-full bg-gray-300 px-4 py-2 text-sm font-medium text-parchment-2 hover:bg-ink-2"
        >
          <Plus size={16} /> {cta.label}
        </Link>
      )}
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useContent } from '../../context/ContentContext';

const EMPTY = { title: '', author: '', cover: '', overview: '', readUrl: '', downloadUrl: '' };

export default function BookForm({ mode }) {
  const isUpdate = mode === 'update';
  const navigate = useNavigate();
  const { id } = useParams();
  const { getById, create, update } = useContent();

  const [fields, setFields] = useState(EMPTY);

  useEffect(() => {
    if (isUpdate) {
      const existing = getById('books', id);
      if (existing) setFields({ ...EMPTY, ...existing });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const setField = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUpdate) {
      update('books', id, fields);
      navigate(`/books/${id}`);
    } else {
      const created = create('books', fields);
      navigate(`/books/${created.id}`);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-5 sm:px-8 py-12">
      <Helmet><title>{isUpdate ? 'Update Book' : 'New Book'}</title></Helmet>
      <h1 className="text-3xl font-extrabold text-ink mb-8">{isUpdate ? 'Update Book' : 'Add a Book'}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field label="Title" value={fields.title} onChange={setField('title')} required />
        <Field label="Author" value={fields.author} onChange={setField('author')} required />
        <Field label="Cover image URL" value={fields.cover} onChange={setField('cover')} />

        <Field
          label="Read online URL"
          value={fields.readUrl}
          onChange={setField('readUrl')}
          hint="A direct link to a PDF or HTML version — embedded in an in-browser reader. Leave blank to show 'not available yet.'"
        />
        <Field
          label="Download URL"
          value={fields.downloadUrl}
          onChange={setField('downloadUrl')}
          hint="Opens/downloads in a new tab. Leave blank to show 'not available yet.'"
        />

        <div>
          <label htmlFor="overview" className="block text-sm font-medium text-ink mb-1">Overview</label>
          <textarea id="overview" rows={5} value={fields.overview} onChange={setField('overview')} required className="w-full rounded-md border border-border px-4 py-2.5 outline-none focus:border-accent" />
        </div>
        <button type="submit" className="self-start mt-2 rounded-md bg-accent px-6 py-2.5 font-semibold text-white hover:bg-accent-dark">
          {isUpdate ? 'Update Book' : 'Save Book'}
        </button>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, required, hint }) {
  const id = label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink mb-1">{label}</label>
      <input id={id} value={value} onChange={onChange} required={required} className="w-full rounded-md border border-border px-4 py-2.5 outline-none focus:border-accent" />
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

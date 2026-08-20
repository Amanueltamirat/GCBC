import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useContent } from '../../context/ContentContext';
import { getErrorMessage } from '../../api/client';

const EMPTY = { title: '', author: '', image: '', excerpt: '', content: '' };

export default function ArticleForm({ mode }) {
  const isUpdate = mode === 'update';
  const navigate = useNavigate();
  const { id } = useParams();
  const { getById, create, update } = useContent();

  const [fields, setFields] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isUpdate) {
      const existing = getById('articles', id);
      if (existing) setFields(existing);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const setField = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (isUpdate) {
        const updated = await update('articles', id, fields);
        navigate(`/articles/${updated.id}`);
      } else {
        const created = await create('articles', fields);
        navigate(`/articles/${created.id}`);
      }
    } catch (err) {
      setError(getErrorMessage(err));
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-5 sm:px-8 py-12">
      <Helmet><title>{isUpdate ? 'Update Article' : 'New Article'}</title></Helmet>
      <h1 className="text-3xl font-extrabold text-ink mb-8">
        {isUpdate ? 'Update Article' : 'Write a New Article'}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <p role="alert" className="rounded-md bg-accent/10 text-accent-dark text-sm px-4 py-2.5">{error}</p>}

        <Field label="Title" value={fields.title} onChange={setField('title')} required />
        <Field label="Author" value={fields.author} onChange={setField('author')} required />
        <Field label="Cover image URL" value={fields.image} onChange={setField('image')} hint="Paste a link to an image." />
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-ink mb-1">Excerpt</label>
          <textarea id="excerpt" rows={2} value={fields.excerpt} onChange={setField('excerpt')} className="w-full rounded-md border border-border px-4 py-2.5 outline-none focus:border-accent" />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-ink mb-1">Content</label>
          <textarea id="content" rows={8} value={fields.content} onChange={setField('content')} required className="w-full rounded-md border border-border px-4 py-2.5 outline-none focus:border-accent" />
        </div>
        <button type="submit" disabled={saving} className="self-start mt-2 rounded-md bg-accent px-6 py-2.5 font-semibold text-white hover:bg-accent-dark disabled:opacity-60">
          {saving ? 'Saving…' : isUpdate ? 'Update Article' : 'Publish Article'}
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

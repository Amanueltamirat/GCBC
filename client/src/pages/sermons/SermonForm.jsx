import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useContent } from '../../context/ContentContext';
import { getErrorMessage } from '../../api/client';
import { PLACEHOLDER_YOUTUBE_ID } from '../../data/sermons';

const EMPTY = { title: '', preacher: '', series: '', scripture: '', youtubeId: '', description: '' };

const FIELDS = [
  ['title', 'Sermon title'],
  ['preacher', 'Preacher name'],
  ['series', 'Series'],
  ['scripture', 'Scripture reference'],
  ['youtubeId', 'YouTube video ID'],
];

export default function SermonForm({ mode }) {
  const isUpdate = mode === 'update';
  const navigate = useNavigate();
  const { id } = useParams();
  const { getById, create, update } = useContent();

  const [fields, setFields] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isUpdate) {
      const existing = getById('sermons', id);
      if (existing) setFields({ ...EMPTY, ...existing });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const setField = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = { ...fields, youtubeId: fields.youtubeId || PLACEHOLDER_YOUTUBE_ID };
    try {
      if (isUpdate) {
        const updated = await update('sermons', id, payload);
        navigate(`/sermons/${updated.id}`);
      } else {
        const created = await create('sermons', payload);
        navigate(`/sermons/${created.id}`);
      }
    } catch (err) {
      setError(getErrorMessage(err));
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-5 sm:px-8 py-12">
      <Helmet><title>{isUpdate ? 'Update Sermon' : 'New Sermon'}</title></Helmet>
      <h1 className="text-3xl font-extrabold text-ink mb-8">
        {isUpdate ? 'Update Sermon' : 'Create a New Sermon'}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <p role="alert" className="rounded-md bg-accent/10 text-accent-dark text-sm px-4 py-2.5">{error}</p>}

        {FIELDS.map(([key, placeholder]) => (
          <input
            key={key}
            value={fields[key]}
            onChange={setField(key)}
            placeholder={placeholder}
            required={key === 'title' || key === 'preacher'}
            className="rounded-md border border-border px-4 py-3 text-ink outline-none focus:border-accent"
          />
        ))}

        <textarea
          value={fields.description}
          onChange={setField('description')}
          placeholder="Description…"
          rows={4}
          className="rounded-md border border-border px-4 py-3 text-ink outline-none focus:border-accent"
        />

        <button type="submit" disabled={saving} className="self-start mt-2 rounded-md bg-accent px-6 py-2.5 font-semibold text-white hover:bg-accent-dark disabled:opacity-60">
          {saving ? 'Saving…' : isUpdate ? 'Update Sermon' : 'Create Sermon'}
        </button>
      </form>
    </div>
  );
}

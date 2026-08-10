import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useContent } from '../../context/ContentContext';
import { PLACEHOLDER_YOUTUBE_ID } from '../../data/sermons';

const EMPTY = {
  title: '',
  preacher: '',
  series: '',
  scripture: '',
  youtubeId: '',
  description: '',
};

export default function SermonForm({ mode }) {
  const isUpdate = mode === 'update';
  const navigate = useNavigate();
  const { id } = useParams();
  const { getById, create, update } = useContent();

  const [fields, setFields] = useState(EMPTY);

  useEffect(() => {
    if (isUpdate) {
      const existing = getById('sermons', id);
      if (existing) setFields(existing);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const setField = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...fields, youtubeId: fields.youtubeId || PLACEHOLDER_YOUTUBE_ID };
    if (isUpdate) {
      update('sermons', id, payload);
      navigate(`/sermons/${id}`);
    } else {
      const created = create('sermons', payload);
      navigate(`/sermons/${created.id}`);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-5 sm:px-8 py-12">
      <Helmet><title>{isUpdate ? 'Update Sermon' : 'New Sermon'}</title></Helmet>
      <h1 className="text-3xl font-extrabold text-ink mb-8">
        {isUpdate ? 'Update Sermon' : 'Create a New Sermon'}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Field label="Title" value={fields.title} onChange={setField('title')} required />
        <Field label="Preacher" value={fields.preacher} onChange={setField('preacher')} required />
        <Field label="Series" value={fields.series} onChange={setField('series')} />
        <Field label="Scripture reference" value={fields.scripture} onChange={setField('scripture')} />
        <Field
          label="YouTube video ID"
          value={fields.youtubeId}
          onChange={setField('youtubeId')}
          hint="The part after v= in the YouTube URL. Leave blank to show a 'coming soon' placeholder."
        />
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-ink mb-1">Description</label>
          <textarea
            id="description"
            rows={4}
            value={fields.description}
            onChange={setField('description')}
            className="w-full rounded-md border border-border px-4 py-2.5 outline-none focus:border-accent"
          />
        </div>
        <button type="submit" className="self-start mt-2 rounded-md bg-accent px-6 py-2.5 font-semibold text-white hover:bg-accent-dark">
          {isUpdate ? 'Update Sermon' : 'Create Sermon'}
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
      <input
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-md border border-border px-4 py-2.5 outline-none focus:border-accent"
      />
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

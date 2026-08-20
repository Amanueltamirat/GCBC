import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Mail } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { POST_TYPE_LABELS } from '../data/memberPosts';
import { notifyMembersByEmail, isEmailNotifyConfigured } from '../utils/emailNotify';
import { getErrorMessage } from '../api/client';

const EMPTY = { type: 'announcement', title: '', body: '' };

export default function MemberPostForm({ mode }) {
  const isUpdate = mode === 'update';
  const navigate = useNavigate();
  const { id } = useParams();
  const { getById, create, update } = useContent();

  const [fields, setFields] = useState(EMPTY);
  const [notify, setNotify] = useState(!isUpdate);
  const [status, setStatus] = useState('idle'); // idle | saving | notifying | notify-error
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    if (isUpdate) {
      const existing = getById('memberPosts', id);
      if (existing) setFields(existing);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const setField = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('saving');
    setSaveError(null);

    let saved;
    try {
      saved = isUpdate ? await update('memberPosts', id, fields) : await create('memberPosts', fields);
    } catch (err) {
      setStatus('idle');
      setSaveError(getErrorMessage(err));
      return;
    }

    if (!notify) {
      navigate('/members');
      return;
    }

    setStatus('notifying');
    try {
      await notifyMembersByEmail(saved);
      navigate('/members');
    } catch (err) {
      setStatus('notify-error');
      // The post already saved successfully — don't strand the admin here
      // just because email failed. Give them a moment to see why, then move on.
      setTimeout(() => navigate('/members'), 2200);
    }
  };

  const configured = isEmailNotifyConfigured();

  return (
    <div className="mx-auto max-w-xl px-5 sm:px-8 py-12">
      <Helmet><title>{isUpdate ? 'Update Post' : 'New Post'}</title></Helmet>
      <h1 className="text-3xl font-extrabold text-ink mb-8">
        {isUpdate ? 'Update Post' : 'New Members Post'}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {saveError && (
          <p role="alert" className="rounded-md bg-accent/10 text-accent-dark text-sm px-4 py-2.5">
            {saveError}
          </p>
        )}

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-ink mb-1">Type</label>
          <select id="type" value={fields.type} onChange={setField('type')} className="w-full rounded-md border border-border px-4 py-2.5 outline-none focus:border-accent">
            {Object.entries(POST_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-ink mb-1">Title</label>
          <input id="title" value={fields.title} onChange={setField('title')} required className="w-full rounded-md border border-border px-4 py-2.5 outline-none focus:border-accent" />
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium text-ink mb-1">Body</label>
          <textarea id="body" rows={6} value={fields.body} onChange={setField('body')} required className="w-full rounded-md border border-border px-4 py-2.5 outline-none focus:border-accent" />
        </div>

        <label className="flex items-start gap-2.5 rounded-md border border-border p-3">
          <input type="checkbox" checked={notify} onChange={(e) => setNotify(e.target.checked)} className="mt-0.5" />
          <span className="text-sm text-ink">
            <span className="flex items-center gap-1.5 font-medium">
              <Mail size={15} /> Notify members by email
            </span>
            <span className="block text-muted mt-0.5">Sends this post to everyone on the member mailing list.</span>
          </span>
        </label>

        {notify && !configured && (
          <p role="alert" className="text-sm text-accent-dark bg-accent/10 rounded-md px-3 py-2">
            EmailJS isn't configured yet — the post will still save, but no email will send.
          </p>
        )}
        {status === 'notifying' && <p role="status" className="text-sm text-muted">Sending notification emails…</p>}
        {status === 'notify-error' && (
          <p role="alert" className="text-sm text-accent-dark">
            Post saved, but sending notifications failed. Check your EmailJS setup.
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'saving' || status === 'notifying'}
          className="self-start mt-2 rounded-md bg-accent px-6 py-2.5 font-semibold text-white hover:bg-accent-dark disabled:opacity-60"
        >
          {status === 'saving' ? 'Saving…' : status === 'notifying' ? 'Sending…' : isUpdate ? 'Update Post' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
}

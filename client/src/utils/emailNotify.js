import emailjs from '@emailjs/browser';
import subscribers from '../data/memberSubscribers';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export function isEmailNotifyConfigured() {
  return Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
}

/**
 * Sends one email per subscriber via EmailJS. EmailJS's free tier sends
 * to a single recipient per call (the template's "To Email" field, set to
 * the {{to_email}} variable in the dashboard — see the README), so this
 * loops rather than trying to BCC everyone in one call.
 *
 * Returns { sent, failed, total } so the UI can show an honest result
 * instead of assuming success.
 */
export async function notifyMembersByEmail(post) {
  if (!isEmailNotifyConfigured()) {
    throw new Error(
      'EmailJS is not configured yet. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to your .env file.'
    );
  }

  const results = await Promise.allSettled(
    subscribers.map((subscriber) =>
      emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          to_email: subscriber.email,
          to_name: subscriber.name,
          post_type: post.type,
          post_title: post.title,
          post_body: post.body,
        },
        { publicKey: PUBLIC_KEY }
      )
    )
  );

  const failed = results.filter((r) => r.status === 'rejected');
  return { sent: results.length - failed.length, failed: failed.length, total: results.length };
}

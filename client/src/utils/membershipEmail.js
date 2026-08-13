import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const MEMBERSHIP_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_MEMBERSHIP_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export function isMembershipEmailConfigured() {
  return Boolean(SERVICE_ID && MEMBERSHIP_TEMPLATE_ID && PUBLIC_KEY);
}

/**
 * Sends a single approval/rejection confirmation email. Uses the same
 * EmailJS service + public key as the member-post notifications, but a
 * different template ID — the content ("your request was approved" vs.
 * "here's a new update from the church") is different enough that one
 * template trying to serve both would need awkward conditional logic on
 * the EmailJS side instead of just having two templates.
 */
export async function sendMembershipDecisionEmail({ toEmail, toName, decision }) {
  if (!isMembershipEmailConfigured()) {
    throw new Error(
      'Membership decision emails are not configured yet. Add VITE_EMAILJS_MEMBERSHIP_TEMPLATE_ID to your .env file.'
    );
  }

  return emailjs.send(
    SERVICE_ID,
    MEMBERSHIP_TEMPLATE_ID,
    {
      to_email: toEmail,
      to_name: toName,
      decision, // 'approved' | 'rejected' — use in the template as {{decision}}
    },
    { publicKey: PUBLIC_KEY }
  );
}

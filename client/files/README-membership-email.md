# Membership approve/reject confirmation emails

## Files
```
.env.example                             → replaces existing — adds VITE_EMAILJS_MEMBERSHIP_TEMPLATE_ID
src/utils/membershipEmail.js             → new — sends the approval/rejection email
src/context/AuthContext.jsx              → replaces existing — approveUser/rejectUser now async, trigger the email
src/pages/admin/MembershipRequests.jsx   → replaces existing — shows per-row "sending/sent/failed" status
```

## 1. Add a second EmailJS template
You already have an EmailJS account from the member-post notification
feature — this reuses the same **Service ID** and **Public Key**, just
needs one more **template**.

1. EmailJS dashboard → **Email Templates** → Create New Template.
2. Same critical step as before: set the template's **"To Email"** field
   to `{{to_email}}`, not a fixed address.
3. Use `{{to_name}}` and `{{decision}}` in the body. EmailJS templates
   don't support conditional logic like `{{#if}}`, so write one plain
   paragraph that reads reasonably for either outcome, for example:
   ```
   Subject: Your Soddo Baptist Church membership request

   Hi {{to_name}},

   Your membership request has been {{decision}}. If approved, you can
   now sign in and access the members area. If you have any questions,
   feel free to reach out to the church office.

   — Soddo Baptist Church
   ```
4. Copy the new **Template ID**.
5. Add it to `.env`:
   ```
   VITE_EMAILJS_MEMBERSHIP_TEMPLATE_ID=template_xxxxxxx
   ```
6. Restart `npm run dev` — same reminder as always, Vite only reads `.env`
   on startup.

## 2. What happens when admin clicks Approve/Reject
1. The status change happens immediately and is never rolled back.
2. A "Sending confirmation email…" line appears under that row.
3. A few seconds later it updates to either "Confirmation email sent" or
   "Decision saved, but the email failed to send" — then clears itself
   after a moment.

This mirrors the exact pattern from the member-post notification feature:
the real action (approve/reject, or publish/save) and the email are two
independent steps. A flaky email send can never make it look like the
admin's decision didn't go through, and a failed email is never hidden —
you'll see it plainly on the row, not just silence.

## 3. Test before this touches anyone real
Approve or reject your own test sign-up (the one you created earlier
testing the sign-up flow) and confirm you actually receive the email —
same advice as before, check spam on first send.

## 4. Same limitations as the earlier EmailJS integration
- Free tier is capped at 200 emails/month combined across both templates.
- Sends from the browser with a public key that's visible in your shipped
  JS by design — turn on EmailJS's domain allowlisting before this goes
  live with real applicants.
- Once a real backend exists, this becomes a server-side email (e.g. with
  nodemailer, same as the earlier Phase 3 sketch) rather than a
  client-side EmailJS call — more reliable, and doesn't expose your
  EmailJS quota to anyone poking at your site's JavaScript.

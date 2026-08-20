import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Check, X, UserMinus, Clock, Users, Archive, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ConfirmDialog from '../../components/ConfirmDialog';

const STATUS_STYLES = {
  pending: 'bg-accent/10 text-accent-dark',
  approved: 'bg-ink/10 text-ink',
  rejected: 'bg-border text-muted',
  removed: 'bg-border text-muted',
};

function initials(name = '') {
  return name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();
}

function Avatar({ name }) {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-white text-sm font-semibold">
      {initials(name)}
    </span>
  );
}

function EmailStatus({ status }) {
  if (!status) return null;
  if (status === 'sending') {
    return <p className="text-xs text-muted mt-2 flex items-center gap-1"><Mail size={12} /> Sending confirmation email…</p>;
  }
  if (status === 'sent') {
    return <p className="text-xs text-ink/60 mt-2 flex items-center gap-1"><Mail size={12} /> Confirmation email sent.</p>;
  }
  return <p className="text-xs text-accent-dark mt-2 flex items-center gap-1"><Mail size={12} /> Decision saved, but the email failed to send.</p>;
}

export default function MembershipRequests() {
  const { users, pendingUsers, activeMembers, approveUser, rejectUser, removeUser } = useAuth();
  const [removeTarget, setRemoveTarget] = useState(null);
  // Keyed by _id now, not email — email was only ever a convenient unique
  // string in the mock version; _id is the real identifier the API uses.
  const [emailStatus, setEmailStatus] = useState({});

  const history = users.filter(
    (u) => u.role !== 'admin' && (u.status === 'rejected' || u.status === 'removed')
  );

  const runWithEmailStatus = async (id, action) => {
    setEmailStatus((s) => ({ ...s, [id]: 'sending' }));
    const result = await action(id);
    setEmailStatus((s) => ({ ...s, [id]: result.emailSent ? 'sent' : 'failed' }));
    setTimeout(() => {
      setEmailStatus((s) => {
        const next = { ...s };
        delete next[id];
        return next;
      });
    }, 4000);
  };

  const handleApprove = (id) => runWithEmailStatus(id, approveUser);
  const handleReject = (id) => runWithEmailStatus(id, rejectUser);

  const handleConfirmRemove = async () => {
    await removeUser(removeTarget._id);
    setRemoveTarget(null);
  };

  return (
    <div>
      <Helmet><title>Manage Members · Soddo Baptist Church</title></Helmet>

      <section className="bg-ink text-white">
        <div className="mx-auto max-w-content px-5 sm:px-8 pt-16 pb-14">
          <p className="text-accent font-semibold tracking-wide uppercase text-sm mb-3">Admin</p>
          <h1 className="text-4xl font-extrabold">Manage Members</h1>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 sm:px-8 -mt-8 relative z-10">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard icon={Clock} label="Pending" value={pendingUsers.length} />
          <StatCard icon={Users} label="Active Members" value={activeMembers.length} />
          <StatCard icon={Archive} label="History" value={history.length} />
        </div>
      </section>

      <div className="mx-auto max-w-content px-5 sm:px-8 py-16">
        <SectionTitle eyebrow="Needs a decision" title="Awaiting Approval" />
        {pendingUsers.length === 0 ? (
          <p className="text-muted mb-14">No pending requests right now.</p>
        ) : (
          <div className="flex flex-col gap-3 mb-14">
            {pendingUsers.map((u) => {
              const sending = emailStatus[u._id] === 'sending';
              return (
                <div key={u._id} className="rounded-lg border border-border p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <Avatar name={u.name} />
                      <div>
                        <p className="font-semibold text-ink">{u.name}</p>
                        <p className="text-sm text-muted">{u.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleApprove(u._id)} disabled={sending} className="flex items-center gap-1.5 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-ink/90 disabled:opacity-60">
                        <Check size={15} /> Approve
                      </button>
                      <button onClick={() => handleReject(u._id)} disabled={sending} className="flex items-center gap-1.5 rounded-md border border-accent/40 px-4 py-2 text-sm font-semibold text-accent hover:bg-accent/5 disabled:opacity-60">
                        <X size={15} /> Reject
                      </button>
                    </div>
                  </div>
                  <EmailStatus status={emailStatus[u._id]} />
                </div>
              );
            })}
          </div>
        )}

        <SectionTitle eyebrow="Current congregation" title="Active Members" />
        {activeMembers.length === 0 ? (
          <p className="text-muted mb-14">No active members yet.</p>
        ) : (
          <div className="flex flex-col gap-3 mb-14">
            {activeMembers.map((u) => (
              <div key={u._id} className="flex items-center justify-between gap-4 rounded-lg border border-border p-4 shadow-sm hover:shadow-md transition-shadow flex-wrap">
                <div className="flex items-center gap-3">
                  <Avatar name={u.name} />
                  <div>
                    <p className="font-semibold text-ink">{u.name}</p>
                    <p className="text-sm text-muted">{u.email}</p>
                  </div>
                </div>
                <button onClick={() => setRemoveTarget(u)} className="flex items-center gap-1.5 rounded-md border border-accent/40 px-4 py-2 text-sm font-semibold text-accent hover:bg-accent/5">
                  <UserMinus size={15} /> Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {history.length > 0 && (
          <>
            <SectionTitle eyebrow="Past decisions" title="History" />
            <div className="flex flex-col gap-2">
              {history.map((u) => (
                <div key={u._id} className="flex items-center justify-between gap-4 rounded-lg border border-border px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={u.name} />
                    <div>
                      <p className="text-sm font-medium text-ink">{u.name}</p>
                      <p className="text-xs text-muted">{u.email}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[u.status]}`}>
                    {u.status}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <ConfirmDialog
        open={!!removeTarget}
        title={`Remove ${removeTarget?.name}?`}
        body="They'll no longer be able to sign in or access the members area. This doesn't delete their history, and they can request to rejoin later."
        onConfirm={handleConfirmRemove}
        onCancel={() => setRemoveTarget(null)}
      />
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-paper p-5 shadow-md ring-1 ring-black/5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
        <Icon size={20} />
      </span>
      <div>
        <p className="text-2xl font-extrabold text-ink leading-none">{value}</p>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted mt-1">{label}</p>
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title }) {
  return (
    <div className="mb-5">
      <p className="text-accent text-sm font-semibold uppercase tracking-wide mb-1">{eyebrow}</p>
      <h2 className="text-2xl font-extrabold text-ink">{title}</h2>
    </div>
  );
}

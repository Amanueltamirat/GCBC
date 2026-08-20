import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import CommentForm from './CommentForm';

export default function CommentThread({ comment, replies, currentUser, isAdmin, onReply, onDelete }) {
  const [replyOpen, setReplyOpen] = useState(false);
  // Was `comment.author === currentUser?.name` — fixed to compare the real
  // identity (email) instead of a display name two people could share.
  // See backend Phase 3's README for the full reasoning.
  const canDelete = isAdmin || comment.authorEmail === currentUser?.email;

  return (
    <div className="flex flex-col gap-3">
      <CommentRow comment={comment} canDelete={canDelete} onDelete={() => onDelete(comment.id)}>
        {currentUser && (
          <button
            onClick={() => setReplyOpen((v) => !v)}
            className="text-xs font-semibold text-accent hover:underline"
          >
            {replyOpen ? 'Cancel' : 'Reply'}
          </button>
        )}
      </CommentRow>

      {replyOpen && (
        <div className="ml-10">
          <CommentForm
            placeholder={`Reply to ${comment.author}…`}
            submitLabel="Reply"
            autoFocus
            onSubmit={(body) => {
              onReply(comment.id, body);
              setReplyOpen(false);
            }}
          />
        </div>
      )}

      {replies.length > 0 && (
        <div className="ml-10 flex flex-col gap-3 border-l-2 border-border pl-4">
          {replies.map((reply) => (
            <CommentRow
              key={reply.id}
              comment={reply}
              canDelete={isAdmin || reply.authorEmail === currentUser?.email}
              onDelete={() => onDelete(reply.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CommentRow({ comment, canDelete, onDelete, children }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm">
          <span className="font-semibold text-ink">{comment.author}</span>
          {comment.authorRole === 'admin' && (
            <span className="ml-1.5 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-accent-dark">
              Admin
            </span>
          )}
          <span className="ml-2 text-xs text-muted">{comment.date}</span>
        </p>
        <p className="text-sm text-ink/80 mt-0.5">{comment.body}</p>
        <div className="mt-1">{children}</div>
      </div>
      {canDelete && (
        <button
          onClick={onDelete}
          aria-label="Delete comment"
          className="shrink-0 text-muted hover:text-accent"
        >
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
}

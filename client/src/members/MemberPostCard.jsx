import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Pencil, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';
import { POST_TYPE_LABELS } from '../data/memberPosts';
import LikeButton from '../components/LikeButton';
import CommentForm from '../components/CommentForm';
import CommentThread from '../components/CommentThread';
import ConfirmDialog from '../components/ConfirmDialog';

const TYPE_STYLES = {
  newsletter: 'bg-accent/10 text-accent-dark',
  announcement: 'bg-ink/10 text-ink',
  update: 'bg-paper-2 text-muted border border-border',
};

export default function MemberPostCard({ post }) {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const { toggleLike, addComment, deleteComment, remove } = useContent();
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const liked = user ? post?.likes?.includes(user.email) : false;
  const topLevelComments = post?.comments?.filter((c) => !c.parentId);
  const repliesFor = (commentId) => post?.comments?.filter((c) => c.parentId === commentId);

  const handleDeletePost = async () => {
    try {
      await remove('memberPosts', post.id);
      setShowDelete(false);
    } catch (err) {
      setDeleteError('Could not delete this post. Please try again.');
    }
  };

  return (
    <article className="rounded-lg border border-border p-5">
      <div className="flex items-start justify-between gap-3">
        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${TYPE_STYLES[post.type]}`}>
          {POST_TYPE_LABELS[post.type]}
        </span>
        {isAdmin && (
          <div className="flex gap-2">
            <button onClick={() => navigate(`/members/${post.id}/edit`)} aria-label="Edit post" className="text-muted hover:text-ink">
              <Pencil size={15} />
            </button>
            <button onClick={() => setShowDelete(true)} aria-label="Delete post" className="text-muted hover:text-accent">
              <Trash2 size={15} />
            </button>
          </div>
        )}
      </div>

      <h2 className="text-lg font-bold text-ink mt-3">{post.title}</h2>
      <p className="text-xs text-muted mt-1 mb-3">{post.date}</p>
      <p className="text-ink/80 leading-relaxed">{post.body}</p>
      {deleteError && <p className="text-sm text-accent-dark mt-2">{deleteError}</p>}

      <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
        <LikeButton
          liked={liked}
          count={post?.likes?.length}
          disabled={!user}
          onToggle={() => user && toggleLike(post.id)}
        />
        <button
          onClick={() => setCommentsOpen((v) => !v)}
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-muted hover:text-ink"
        >
          <MessageCircle size={17} />
          {post?.comments?.length > 0 ? post.comments.length : ''}{' '}
          {post?.comments?.length === 1 ? 'Comment' : 'Comments'}
        </button>
      </div>

      {commentsOpen && (
        <div className="mt-4 flex flex-col gap-4 border-t border-border pt-4">
          {topLevelComments.length === 0 && (
            <p className="text-sm text-muted">No comments yet — be the first to say something.</p>
          )}
          {topLevelComments.map((comment) => (
            <CommentThread
              key={comment.id}
              comment={comment}
              replies={repliesFor(comment.id)}
              currentUser={user}
              isAdmin={isAdmin}
              onReply={(parentId, body) => addComment(post.id, { body, parentId })}
              onDelete={(commentId) => deleteComment(post.id, commentId)}
            />
          ))}

          {user ? (
            <CommentForm placeholder="Write a comment…" onSubmit={(body) => addComment(post.id, { body })} />
          ) : (
            <p className="text-sm text-muted">Sign in to join the conversation.</p>
          )}
        </div>
      )}

      <ConfirmDialog
        open={showDelete}
        title="Delete this post?"
        body="This also removes all its comments. This action can't be undone."
        onConfirm={handleDeletePost}
        onCancel={() => setShowDelete(false)}
      />
    </article>
  );
}

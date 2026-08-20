import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import MemberPost from '../models/MemberPost.js';
import { isAuth, isAdmin, isMember } from '../middleware/auth.js';

const router = express.Router();

// Member-only content — unlike Sermons/Articles/Books, this isn't public,
// so even reading the list requires isMember (an approved member or admin).
router.get(
  '/',
  isAuth,
  isMember,
  expressAsyncHandler(async (req, res) => {
    const posts = await MemberPost.find({}).sort({ createdAt: -1 });
    res.send(posts);
  })
);

router.get(
  '/:id',
  isAuth,
  isMember,
  expressAsyncHandler(async (req, res) => {
    const post = await MemberPost.findById(req.params.id);
    if (!post) return res.status(404).send({ message: 'Post not found.' });
    res.send(post);
  })
);

router.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { type, title, body } = req.body;
    if (!type || !title || !body) {
      return res.status(400).send({ message: 'Type, title, and body are required.' });
    }
    const post = await MemberPost.create({ type, title, body, likes: [], comments: [] });
    res.status(201).send(post);
  })
);

router.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const post = await MemberPost.findById(req.params.id);
    if (!post) return res.status(404).send({ message: 'Post not found.' });

    const { type, title, body } = req.body;
    if (type !== undefined) post.type = type;
    if (title !== undefined) post.title = title;
    if (body !== undefined) post.body = body;

    const updated = await post.save();
    res.send(updated);
  })
);

router.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const post = await MemberPost.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).send({ message: 'Post not found.' });
    res.send({ message: 'Post deleted.' });
  })
);

// --- Engagement — any approved member, not just admins ---

router.post(
  '/:id/like',
  isAuth,
  isMember,
  expressAsyncHandler(async (req, res) => {
    const post = await MemberPost.findById(req.params.id);
    if (!post) return res.status(404).send({ message: 'Post not found.' });

    const email = req.user.email;
    const alreadyLiked = post.likes.includes(email);
    post.likes = alreadyLiked ? post.likes.filter((e) => e !== email) : [...post.likes, email];

    await post.save();
    res.send(post);
  })
);

router.post(
  '/:id/comments',
  isAuth,
  isMember,
  expressAsyncHandler(async (req, res) => {
    const post = await MemberPost.findById(req.params.id);
    if (!post) return res.status(404).send({ message: 'Post not found.' });

    const { body, parentId } = req.body;
    if (!body || !body.trim()) {
      return res.status(400).send({ message: 'Comment body is required.' });
    }

    post.comments.push({
      author: req.user.name,
      authorEmail: req.user.email,
      authorRole: req.user.role,
      body: body.trim(),
      parentId: parentId || null,
    });

    await post.save();
    res.status(201).send(post);
  })
);

router.delete(
  '/:id/comments/:commentId',
  isAuth,
  isMember,
  expressAsyncHandler(async (req, res) => {
    const post = await MemberPost.findById(req.params.id);
    if (!post) return res.status(404).send({ message: 'Post not found.' });

    const comment = post.comments.id(req.params.commentId);
    if (!comment) return res.status(404).send({ message: 'Comment not found.' });

    const isOwner = comment.authorEmail === req.user.email;
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).send({ message: 'You can only delete your own comments.' });
    }
    post.comments = post.comments.filter(
      (c) => c._id.toString() !== req.params.commentId && c.parentId?.toString() !== req.params.commentId
    );

    await post.save();
    res.send(post);
  })
);

export default router;

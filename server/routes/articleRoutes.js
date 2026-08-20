import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Article from '../models/Article.js';
import { isAuth, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const articles = await Article.find({}).sort({ createdAt: -1 });
    res.send(articles);
  })
);

router.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).send({ message: 'Article not found.' });
    res.send(article);
  })
);

router.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { title, author, image, excerpt, content } = req.body;
    if (!title || !author || !content) {
      return res.status(400).send({ message: 'Title, author, and content are required.' });
    }
    const article = await Article.create({ title, author, image, excerpt, content });
    res.status(201).send(article);
  })
);

router.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).send({ message: 'Article not found.' });

    const { title, author, image, excerpt, content } = req.body;
    if (title !== undefined) article.title = title;
    if (author !== undefined) article.author = author;
    if (image !== undefined) article.image = image;
    if (excerpt !== undefined) article.excerpt = excerpt;
    if (content !== undefined) article.content = content;

    const updated = await article.save();
    res.send(updated);
  })
);

router.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).send({ message: 'Article not found.' });
    res.send({ message: 'Article deleted.' });
  })
);

export default router;

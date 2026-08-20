import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Book from '../models/Book.js';
import { isAuth, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const books = await Book.find({}).sort({ createdAt: -1 });
    res.send(books);
  })
);

router.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send({ message: 'Book not found.' });
    res.send(book);
  })
);

router.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { title, author, cover, overview, readUrl, downloadUrl } = req.body;
    if (!title || !author || !overview) {
      return res.status(400).send({ message: 'Title, author, and overview are required.' });
    }
    const book = await Book.create({ title, author, cover, overview, readUrl, downloadUrl });
    res.status(201).send(book);
  })
);

router.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send({ message: 'Book not found.' });

    const { title, author, cover, overview, readUrl, downloadUrl } = req.body;
    if (title !== undefined) book.title = title;
    if (author !== undefined) book.author = author;
    if (cover !== undefined) book.cover = cover;
    if (overview !== undefined) book.overview = overview;
    if (readUrl !== undefined) book.readUrl = readUrl;
    if (downloadUrl !== undefined) book.downloadUrl = downloadUrl;

    const updated = await book.save();
    res.send(updated);
  })
);

router.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).send({ message: 'Book not found.' });
    res.send({ message: 'Book deleted.' });
  })
);

export default router;

import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { isAuth, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.send(users);
  })
);

router.put(
  '/:id/approve',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true }).select('-password');
    if (!user) return res.status(404).send({ message: 'User not found.' });
    res.send(user);
  })
);

router.put(
  '/:id/reject',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true }).select('-password');
    if (!user) return res.status(404).send({ message: 'User not found.' });
    res.send(user);
  })
);

router.put(
  '/:id/remove',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const target = await User.findById(req.params.id);
    if (!target) return res.status(404).send({ message: 'User not found.' });


    if (target.role === 'admin') {
      return res.status(400).send({ message: 'Admin accounts cannot be removed.' });
    }

    target.status = 'removed';
    await target.save();
    res.send(await User.findById(target._id).select('-password'));
  })
);

export default router;

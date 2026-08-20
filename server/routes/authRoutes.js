import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.post(
    '/signup',
    expressAsyncHandler(async( req, res) => {
        const { name, email, password } = req.body;
        if(!name || !email || !password) {
            return res.status(400).send({message: 'Name, email and password are required.'})
        }

        const normalizedEmail = email.toLowerCase().trim();

        const existing = await User.findOne({ email: normalizedEmail });

        if(existing && ['pending', 'approved'].includes(existing.status)) {
            return res.status(409).send({
                message: 
                existing.status === 'pending' ? 
                'An account with this email is already awaiting approval.':
                'An account with this email already exists, try signing in instead.'
            });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        if(existing) {
            existing.name = name;
            existing.password = hashedPassword;
            existing.status = 'pending';
            await existing.save();

        } else {
            await User.create({
                name,
                email: normalizedEmail,
                password: hashedPassword,
                role:'member',
                status:'pending',
            });
        }
        res.status(201).send({ message: 'Registration received, pending admin approval.'})
    } )
);

router.post(
    '/signin',
    expressAsyncHandler(async( req, res ) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email?.toLowerCase().trim()});

        if(!user || !bcrypt.compareSync(password || '', user.password)) {
            return res.status(401).send({ message:'Invalid email or password'});
        }
        if (user.status === 'pending') {
      return res.status(403).send({ message: 'Your registration is still pending admin approval.' });
    }
    if (user.status === 'rejected') {
      return res.status(403).send({ message: 'Your registration was not approved. Contact the church office for details.' });
    }
    if (user.status === 'removed') {
      return res.status(403).send({ message: 'This account is no longer active. Contact the church office if you believe this is a mistake.' });
    }
     res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      token: generateToken(user),
    });
    })
)

router.get(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).send({ message: 'User not found.' });
    res.send(user);
  })
);

export default router;
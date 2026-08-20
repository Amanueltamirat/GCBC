// Run from your backend project root: node check-users.mjs
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);
const users = await User.find({}).select('name email role status');
console.log(users);
await mongoose.disconnect();
process.exit(0);

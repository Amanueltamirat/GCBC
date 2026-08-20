import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import User from './models/User.js';

dotenv.config();

const run = async () => {
  await connectDB();

  const email = (process.env.SEED_ADMIN_EMAIL || 'admin@gcbc.org').toLowerCase();
  const existing = await User.findOne({ email });

  if (existing) {
    console.log(`Admin already exists: ${email} (status: ${existing.status})`);
  } else {
    await User.create({
      name: process.env.SEED_ADMIN_NAME || 'Admin',
      email,
      password: bcrypt.hashSync(process.env.SEED_ADMIN_PASSWORD || 'changeme123', 10),
      role: 'admin',
      status: 'approved',
    });
    console.log(`Admin created: ${email}`);
    console.log('Change this password after your first sign-in.');
  }

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

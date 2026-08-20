// import serverless from 'serverless-http';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import sermonRoutes from './routes/sermonRoutes.js'
import articleRoutes from './routes/articleRoutes.js';
import bookRoutes from './routes/bookRoutes.js'
import uploadRoute from './routes/uploadRoutes.js'
import memberPostRoutes from './routes/memberPostRoutes.js'
import { notFound, errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  'https://gcbc-1d76.onrender.com', // Production Render Frontend
  'http://localhost:5173' // Local Vite Frontend
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or mobile apps)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      // Dynamically returns the specific origin back to the browser
      callback(null, true); 
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true // Required because your frontend is sending withCredentials
};



app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));
app.use(express.json());

app.get('/api/health', (req, res) => res.send({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/admin/users', userRoutes);
app.use('/api/sermons', sermonRoutes)
app.use('/api/articles', articleRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/uploads', uploadRoute);
app.use('/api/member-posts', memberPostRoutes)
// Sermons/Articles/Books/MemberPosts routes land here in the next phase.

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });

  // export const handler = serverless(app);
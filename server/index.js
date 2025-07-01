import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import quizRoutes from './routes/quiz.js'; // you'll create this
import attemptRoutes from './routes/attempt.js'; // you'll create this too

dotenv.config(); // Loads .env variables
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);         // login/signup
app.use('/api/quiz', quizRoutes);         // quiz CRUD
app.use('/api/attempt', attemptRoutes);   // user attempts

// Default Route
app.get('/', (req, res) => {
  res.send('QuizOpedia API running 🚀');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

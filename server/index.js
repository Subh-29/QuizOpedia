import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import quizRoutes from './routes/quiz.js';
import attemptRoutes from './routes/attempt.js'; 
import aiRoutes from './routes/ai.js'
dotenv.config(); // Loads .env variables
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// app.use(cors({origin: ['https://jz3w10vb-3000.inc1.devtunnels.ms', 'http://localhost:3000/', 'https://quiz-opedia-ai.vercel.app/']}));
// Routes
app.use('/api/auth', authRoutes);         // login/signup
app.use('/api/quiz', quizRoutes);         // quiz CRUD
app.use('/api/attempt', attemptRoutes);   // user attempts
app.use('/api/ai', aiRoutes)              // ai explanation
// Default Route
app.get('/', (req, res) => {
  res.send('QuizOpedia API running 🚀');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

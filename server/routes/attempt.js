import express from 'express';
import prisma from '../prisma.js';
import { protect } from '../middleware/auth.js';
import { nanoid } from 'nanoid';

const router = express.Router();

// 🚨 Attempt a quiz
router.post('/', protect, async (req, res) => {
  const { quizId, answers } = req.body;
  const userId = req.user.id;
  console.log(userId);
  

  try {
    // 👀 Check if user already attempted this quiz
    const existing = await prisma.attempt.findFirst({
      where: { quizId, userId }
    });

    if (existing) {
      return res.status(403).json({ error: 'Quiz already attempted' });
    }

    // 🧠 Fetch quiz + questions
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true }
    });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // 🔢 Score calculation
    let score = 0;
    quiz.questions.forEach((q) => {
      if (answers[q.id] && answers[q.id] === q.answer) {
        score++;
      }
    });

    // 💾 Save attempt
    const attempt = await prisma.attempt.create({
      data: {
        id: `atp-` + nanoid(),
        quizId,
        userId,
        answers,
        score
      }
    });

    res.status(201).json({ message: 'Quiz submitted!', score });
  } catch (err) {
    console.error('❌ Error submitting quiz:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/my', protect, async (req, res) => {
  try {
    // console.log("Quiz: ", quizId);
    
    const attempt = await prisma.attempt.findMany({
      where: { userId: req.user.id },
      include: {
        quiz: true
      }
    });
    
    res.json({attempt});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// 🧾 Fetch all attempts of a user (optional for dashboard/profile)
router.get('/my/:id', protect, async (req, res) => {
  try {
    const quizId = req.params.id;
    console.log("Quiz: ", quizId);
    
    const attempt = await prisma.attempt.findFirst({
      where: { quizId, userId: req.user.id },
      include: {
        quiz: true
      }
    });
    const question = await prisma.question.findMany({
      where: { quizId},
    });
    res.json({...attempt, question});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;

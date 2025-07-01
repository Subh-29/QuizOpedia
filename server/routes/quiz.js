import express from 'express';
import prisma from '../prisma.js';
import { protect, requireAdmin } from '../middleware/auth.js';
// import { openaiGenerateQuiz } from '../utils/openai.js'; // You'll create this
import { nanoid } from 'nanoid';

const router = express.Router();


// 👇 POST /api/quiz/create — Create quiz manually (admin only)
router.post('/create', protect, requireAdmin, async (req, res) => {
  try {
    const { title, topic, tags, questions } = req.body;

    const quiz = await prisma.quiz.create({
      data: {
        id: `qz-${nanoid()}`,
        title,
        topic,
        tags,
        questions: {
          create: questions.map((q) => ({
            id: `qn-${nanoid()}`,
            text: q.text,
            options: q.options,
            answer: q.answer
          }))
        }
      },
      include: { questions: true }
    });

    res.status(201).json(quiz);
  } catch (err) {
    console.error('❌ Quiz creation failed:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});


// // 👇 POST /api/quiz/ai-assist — Generate quiz using OpenAI
// router.post('/ai-assist', protect, requireAdmin, async (req, res) => {
//   try {
//     const { topic, numQuestions } = req.body;

//     if (!topic || !numQuestions) {
//       return res.status(400).json({ error: 'Topic and number of questions required' });
//     }

//     const generatedQuiz = await openaiGenerateQuiz(topic, numQuestions);

//     res.json({ generatedQuiz }); // send to frontend to review & edit before saving
//   } catch (err) {
//     console.error('❌ AI Assist failed:', err);
//     res.status(500).json({ error: 'AI generation failed' });
//   }
// });


// 👇 GET /api/quiz/all — Get all quizzes (for user or admin dashboard)
router.get('/all', protect, async (req, res) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: { questions: true }
    });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});


// 👇 GET /api/quiz/:id — Get a specific quiz (for attempt page)
router.get('/:id', protect, async (req, res) => {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: req.params.id },
      include: { questions: true }
    });

    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});


// 👇 PUT /api/quiz/:id — Edit existing quiz (admin only)
router.put('/:id', protect, requireAdmin, async (req, res) => {
  try {
    const { title, topic, tags, questions } = req.body;

    // delete old questions first
    await prisma.question.deleteMany({
      where: { quizId: req.params.id }
    });

    const updatedQuiz = await prisma.quiz.update({
      where: { id: req.params.id },
      data: {
        title,
        topic,
        tags,
        questions: {
          create: questions.map((q) => ({
            id: nanoid(),
            text: q.text,
            options: q.options,
            answer: q.answer
          }))
        }
      },
      include: { questions: true }
    });

    res.json(updatedQuiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update quiz' });
  }
});


export default router;

import express from 'express';
import prisma from '../prisma.js';
import dotenv from 'dotenv'

import { protect, requireAdmin } from '../middleware/auth.js';
// import { openaiGenerateQuiz } from '../utils/openai.js'; // You'll create this
import { GoogleGenerativeAI } from '@google/generative-ai'
import { nanoid } from 'nanoid';

dotenv.config(); // Loads .env variables


const router = express.Router();
const apikey = (process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const genAi = new GoogleGenerativeAI(apikey);

// 👇 POST /api/quiz/create — Create quiz manually (admin only)
router.post('/create', protect, requireAdmin, async (req, res) => {
  try {
    const { title, topic, tags, questions, timePerQuestion } = req.body;

    const quiz = await prisma.quiz.create({
      data: {
        id: `qz-${nanoid()}`,
        title,
        topic,
        tags,
        timeLimit: Number(timePerQuestion),
        questions: {
          create: questions.map((q) => ({
            id: `qn-${nanoid()}`,
            text: q?.text,
            options: q?.options,
            answer: q?.answer
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


// 👇 POST /api/quiz/ai-assist — Generate quiz using OpenAI
router.post('/ai-assist', protect, requireAdmin, async (req, res) => {

  const { topic, numOfQn } = req.body;
  try {

    if (!topic || !numOfQn) {
      return res.status(400).json({ error: 'Topic and number of questions required' });
    }

    const model = genAi.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
You are to generate a quiz in JSON format.

- Topic: "${topic}"
- Number of questions: ${numOfQn}
- Each question must be a multiple choice question (MCQ).
- Every question should have:
  - "text" (string): The question itself
  - "options" (array of 4 strings): Exactly 4 answer choices
  - "answer" (string): One of the 4 options which is the correct answer

The final output must strictly follow this **JSON format**:

{
  "title": "${topic} Quiz",
  "topic": "${topic}",
  "tags": ["${topic}", "Next tag similar to topic"],
  "questions": [
    {
      "text": "Question 1 goes here...",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Option A"
    },
    ...
  ]
}

`;



    const result = await model.generateContent(prompt);

    const text = result.response.candidates[0].content.parts[0].text;
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;

    const jsonString = text.slice(jsonStart, jsonEnd);

    const quiz = JSON.parse(jsonString);
    console.log(quiz);

    res.json({ quiz }); // send to frontend to review & edit before saving
  } catch (err) {
    console.error('❌ AI Assist failed:', err);
//     const model = genAi.getGenerativeModel({ model: "gemini-2.5-flash" });
// const prompt = `
// You are to generate a quiz in JSON format.

// - Topic: "${topic}"
// - Number of questions: ${numQuestions}
// - Each question must be a multiple choice question (MCQ).
// - Every question should have:
//   - "text" (string): The question itself
//   - "options" (array of 4 strings): Exactly 4 answer choices
//   - "answer" (string): One of the 4 options which is the correct answer

// The final output must strictly follow this **JSON format**:

// {
//   "title": "${topic} Quiz",
//   "topic": "${topic}",
//   "tags": ["${topic}", "Next tag similar to topic"],
//   "questions": [
//     {
//       "text": "Question 1 goes here...",
//       "options": ["Option A", "Option B", "Option C", "Option D"],
//       "answer": "Option A"
//     },
//     ...
//   ]
// }

// `;
//     const result = await model.generateContent(prompt)
//     console.log(result);

    res.status(500).json({ error: "AI generation failed" });
  }
});

// 👇 DELETE /api/quiz/:id — Delete a quiz (admin only)
router.delete('/:id', protect, requireAdmin, async (req, res) => {
  try {
    // First delete the questions linked to the quiz
    await prisma.question.deleteMany({
      where: { quizId: req.params.id }
    });

    // Then delete the quiz itself
    await prisma.quiz.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'Quiz deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting quiz:', err);
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
});


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

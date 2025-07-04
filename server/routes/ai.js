import express from 'express';
import dotenv from 'dotenv'

import { protect, requireAdmin } from '../middleware/auth.js';
import { GoogleGenerativeAI } from '@google/generative-ai'

dotenv.config(); // Loads .env variables

const router = express.Router();
const apikey = (process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const genAi = new GoogleGenerativeAI(apikey);

router.post("/explain", protect, async (req, res) => {
    const { question,
        userAnswer,
        correctAnswer,
        prompt } = req.body;

    try {
        if (!question || !prompt || !correctAnswer) {
            return res.status(400).json({ error: 'Prompt is required' });
        }
        const model = genAi.getGenerativeModel({ model: 'gemini-2.5-flash' });
        const mainPrompt = `
        give a very short answer within 30-40 words for the ${prompt}, where question is ${question}, correction option: ${correctAnswer}, userselected the option: ${userAnswer}
        `;

        const result = await model.generateContent(mainPrompt);
        const text = result.response.candidates[0].content.parts[0].text;
        console.log(text);
        
        res.json({text});
    } catch (error) {
        console.error(error);

    }
});

export default router;
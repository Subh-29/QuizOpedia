import express from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../prisma.js';
import { generateToken } from '../utils/jwt.js';
import { nanoid } from 'nanoid';

const router = express.Router();

// ✅ Signup Route
router.post('/signup', async (req, res) => {
  const {name, email, password, role } = req.body;

  try {
    // ❗Check if user already exists
    const existing = await prisma?.user?.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // 🔐 Hash password
    const hash = await bcrypt.hash(password, 10);

    // 💾 Save to DB
    const user = await prisma.user.create({
      data: { id: `usr-${nanoid()}`, email, password: hash, role: role || 'user' }
    });

    // 🎟️ Generate JWT
    const token = generateToken({ id: user.id, role: user.role });

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('[Signup Error]', err);
    res.status(500).json({ error: 'Signup failed. Try again later.' });
  }
});

// ✅ Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email, " ", password);
  
  try {
    // 🔍 Check if user exists
    const user = await prisma?.user?.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 🔐 Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Wrong password' });
    }

    // 🎟️ Create token
    const token = generateToken({ id: user.id, role: user.role });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('[Login Error]', err);
    res.status(500).json({ error: 'Login failed. Try again later.' });
  }
});

export default router;

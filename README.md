Bet. Here's the **fully professional, no-nonsense README** for your **Quizopedia** project — straight to the point, everything a dev or reviewer needs to get up and running like a pro.

---

## 💡 What is Quizopedia?

**Quizopedia** is a full-stack quiz management system where:

* **Admins** can create quizzes (manually or with AI help).
* **Users** can attempt them once and see their scores.
* AI can **explain wrong answers** when asked.
* Everything is protected by **role-based auth** (JWT), with separate routes and access levels.

The stack?

* **Frontend**: Next.js + Redux Toolkit + TailwindCSS + GSAP
* **Backend**: Express.js + Prisma (PostgreSQL) + JWT
* **AI**: Gemini API (Google Generative AI)

---

## ⚙️ How to Use

### 🔧 Setup (Both Client & Server)

1. **Clone this repo**

```bash
git clone https://github.com/Subh-29/QuizOpedia.git
cd quizopedia
```

2. **Install Dependencies**

```bash
cd client && npm i
cd ../server && npm i
```

3. **Set Up Environment Variables**

**In `/server/.env`:**

```
DATABASE_URL=your_postgres_db_url
JWT_SECRET=your_super_secret_key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key
```

**In `/client/.env.local`:**

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key
```

4. **Initialize DB**

```bash
cd server
npx prisma migrate dev --name init
npx prisma generate
```

5. **Run the Project**

* Start Backend:

  ```bash
  cd server
  npm run dev
  ```

* Start Frontend:

  ```bash
  cd client
  npm run dev
  ```

---

## 🔐 Roles & Access

* **Guest** → Sees Home, About, Login
* **User** → Views quizzes, attempts once, sees score, uses "Ask AI"
* **Admin** → Creates, edits, deletes quizzes using a dashboard

JWT tokens are stored in `localStorage`, decoded client-side, and protected server-side with middleware.

---

## ✨ Features

✅ User can:

* View all quizzes
* Attempt once
* See result with correct/incorrect answers
* Ask AI for explanation

✅ Admin can:

* Add/Edit/Delete quizzes
* Manually or auto-generate questions with Gemini AI

✅ Realtime UI:

* GSAP for animations
* Redux Toolkit for clean state management
* Protected routes via client + server logic

---

## 🧠 AI Integration

Using Google Gemini’s Flash 2.5 model:

* Admins can generate questions using a topic prompt
* Users can get **brief explanations** of why their answer was wrong based on prompt + context


---


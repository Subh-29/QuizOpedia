'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-[var(--text-secondary)] py-10 px-6 border-t border-[var(--soft)] mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding */}
        <div>
          <h2 className="text-3xl font-extrabold text-[var(--text-heading)] mb-3 tracking-tight">
            QuizOpedia
          </h2>
          <p className="text-sm leading-relaxed">
            Crack your concepts, test your knowledge, and level up every day. Your ultimate quiz hub for academics and skills.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-[var(--accent)] transition">🏠 Home</Link></li>
            <li><Link href="/about" className="hover:text-[var(--accent)] transition">ℹ️ About</Link></li>
            <li><Link href="/leaderboard" className="hover:text-[var(--accent)] transition">🏆 Leaderboard</Link></li>
            <li><Link href="/login" className="hover:text-[var(--accent)] transition">🔐 Login</Link></li>
          </ul>
        </div>

        {/* Contact / Feedback */}
        <div>
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Get in Touch</h3>
          <p className="text-sm">Got suggestions, bugs, or want to collab? Hit us up 👇</p>
          <a
            href="mailto:support@quizopedia.com"
            className="inline-block mt-3 text-[var(--accent)] hover:underline"
          >
            📧 support@quizopedia.com
          </a>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-zinc-500 border-t border-[var(--soft)] pt-6">
        &copy; {new Date().getFullYear()} QuizOpedia — All rights reserved.
      </div>
    </footer>
  );
}

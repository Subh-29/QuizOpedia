"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AboutPage() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );
    gsap.fromTo(
      paraRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, delay: 0.3, ease: "power2.out" }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] px-6 py-16 flex flex-col items-center justify-center text-center"
    >
      <h1
        ref={headingRef}
        className="text-4xl md:text-6xl font-bold text-[var(--text-heading)] mb-6"
      >
        About QuizOpedia
      </h1>

      <p
        ref={paraRef}
        className="max-w-3xl text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed"
      >
        QuizOpedia is your go-to platform for engaging, AI-powered quizzes.
        Whether you're an admin crafting mind-bending challenges or a user hungry
        for knowledge — we’ve got you covered. Built with <strong>Next.js</strong>,
        styled with <strong>TailwindCSS</strong>, and boosted by <strong>Gemini AI</strong>,
        our platform lets you create, customize, and compete like never before.
      </p>

      <div className="mt-10 flex flex-col md:flex-row gap-6 items-center justify-center">
        <div className="bg-[var(--primary)] shadow-lg p-6 rounded-xl w-72">
          <h2 className="text-xl font-semibold text-[var(--text-accent)] mb-2">
            AI-Powered Quizzes
          </h2>
          <p className="text-[var(--text-secondary)] text-sm">
            Generate questions instantly using Gemini 2.5 Flash — all tailored to your topic.
          </p>
        </div>

        <div className="bg-[var(--primary)] shadow-lg p-6 rounded-xl w-72">
          <h2 className="text-xl font-semibold text-[var(--text-accent)] mb-2">
            Leaderboards & Insights
          </h2>
          <p className="text-[var(--text-secondary)] text-sm">
            Compete, track performance, and dive into detailed quiz analytics with our beautiful dashboards.
          </p>
        </div>

        <div className="bg-[var(--primary)] shadow-lg p-6 rounded-xl w-72">
          <h2 className="text-xl font-semibold text-[var(--text-accent)] mb-2">
            Admin Friendly
          </h2>
          <p className="text-[var(--text-secondary)] text-sm">
            Create quizzes manually or use AI, manage users, and edit everything — with full control.
          </p>
        </div>
      </div>
    </div>
  );
}

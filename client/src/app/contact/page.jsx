"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ContactPage() {
  const headingRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] px-6 py-20 flex flex-col items-center justify-center">
      <h1
        ref={headingRef}
        className="text-4xl md:text-5xl font-bold text-[var(--text-heading)] mb-8 text-center"
      >
        Get in Touch ✉️
      </h1>

      <form
        ref={formRef}
        className="bg-[var(--primary)] shadow-[var(--shadow)] p-8 rounded-xl max-w-xl w-full space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
            Your Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full px-4 py-2 rounded-md border bg-[var(--soft)] text-[var(--text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="john@example.com"
            className="w-full px-4 py-2 rounded-md border bg-[var(--soft)] text-[var(--text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
            Message
          </label>
          <textarea
            rows="4"
            placeholder="What's on your mind?"
            className="w-full px-4 py-2 rounded-md border bg-[var(--soft)] text-[var(--text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[var(--accent)] text-white py-2 rounded-md hover:bg-opacity-90 transition-all cursor-pointer"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

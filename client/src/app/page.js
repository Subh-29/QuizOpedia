"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import Image from "next/image";

gsap.registerPlugin(TextPlugin);

export default function HomePage() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    // Typing animation for QuizOpedia
    gsap.to(titleRef.current, {
      duration: 2,
      text: "QuizOpedia",
      ease: "power1.inOut",
      delay: 0.3,
    });

    gsap.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 2.0, ease: "power2.out" }
    );

    gsap.fromTo(
      buttonRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, delay: 2.3, ease: "back.out(1.7)" }
    );

    gsap.fromTo(
      imageRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5, delay: 2.5, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] flex flex-col justify-center items-center px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[var(--text-heading)]">
            <span ref={titleRef}></span>
            <span className="animate-blink text-[var(--text-heading)]">|</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-[var(--text-secondary)] mb-8"
          >
            Unleash your knowledge and challenge yourself with quizzes powered by AI.
          </p>

          <button
            ref={buttonRef}
            onClick={() => router.push("/dashboard")}
            className="bg-[var(--accent)] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-opacity-90 transition"
          >
            Get Started
          </button>
        </div>

        {/* Right Content */}
        <div ref={imageRef} className="relative w-full flex justify-center">
          <Image
            src="https://cdn-icons-png.freepik.com/256/16614/16614194.png?semt=ais_hybrid"
            alt="Quiz Illustration"
            width={200}
            height={200}
            className="drop-shadow-2xl"
            priority
          />
        </div>
      </div>

      {/* Cursor animation CSS */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        .animate-blink {
          animation: blink 1s step-start infinite;
        }
      `}</style>
    </div>
  );
}

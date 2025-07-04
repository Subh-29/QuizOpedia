'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

export default function UserDashboardCard({ user }) {
  const cardRef = useRef();
  const statRefs = useRef([]);
  const achievementRef = useRef();
  const inventoryRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.6 } });

    tl.fromTo(cardRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0 });

    statRefs.current.forEach((el, i) => {
      tl.fromTo(el, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, `-=${0.4 - i * 0.1}`);
    });

    tl.fromTo(achievementRef.current, { x: -30, opacity: 0 }, { x: 0, opacity: 1 }, '-=0.3');
    tl.fromTo(inventoryRef.current, { x: 30, opacity: 0 }, { x: 0, opacity: 1 }, '-=0.3');
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-[var(--primary)] rounded-3xl p-6 shadow-lg border border-[var(--soft)] text-[var(--text-on-light)] w-full max-w-4xl mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Profile + Stats */}
        <div className="flex items-center gap-4">
          <Image
            src={user?.image || '/avatar.svg'}
            alt="User Avatar"
            width={80}
            height={80}
            className="rounded-full border-4 border-[var(--accent)]"
          />
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-heading)]">{user.name}</h2>
            <p className="text-[var(--text-secondary)] text-sm">{user.email}</p>
            <div className="mt-2 bg-[var(--bg)] h-2 w-40 rounded-full overflow-hidden">
              <div className="bg-[var(--accent)] h-full w-3/4" />
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1">XP: 3000 / 8000</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button className="bg-white text-[var(--text-accent)] px-4 py-2 rounded-lg font-semibold hover:scale-105 duration-200">
            Join Lobby
          </button>
          <button className="bg-[var(--text-accent)] text-white px-4 py-2 rounded-lg font-semibold hover:scale-105 duration-200">
            Start Quiz
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 text-center mt-6 text-[var(--text-primary)]">
        <div ref={(el) => (statRefs.current[0] = el)}>
          <p className="text-xl font-bold">{user.wins}</p>
          <p className="text-sm text-[var(--text-secondary)]">Game Wins</p>
        </div>
        <div ref={(el) => (statRefs.current[1] = el)}>
          <p className="text-xl font-bold">{user.highestScore}</p>
          <p className="text-sm text-[var(--text-secondary)]">Highest Score</p>
        </div>
        <div ref={(el) => (statRefs.current[2] = el)}>
          <p className="text-xl font-bold">{user.correctAnswers}</p>
          <p className="text-sm text-[var(--text-secondary)]">Correct Answers</p>
        </div>
      </div>

      {/* Achievements + Inventory */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div ref={achievementRef}>
          <h3 className="font-semibold text-lg text-[var(--text-heading)] mb-2">Achievements</h3>
          <div className="flex gap-3">
            {user.achievements.map((ach, i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-full bg-[var(--bg)] flex items-center justify-center border border-[var(--accent)]"
              >
                🏅
              </div>
            ))}
          </div>
        </div>

        <div ref={inventoryRef}>
          <h3 className="font-semibold text-lg text-[var(--text-heading)] mb-2">Inventory</h3>
          <div className="flex gap-3">
            {user.inventory.map((inv, i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-full bg-[var(--bg)] flex items-center justify-center border border-[var(--accent)]"
              >
                🎁
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

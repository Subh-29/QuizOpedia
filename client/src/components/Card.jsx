'use client';

export default function Card({ children, className = '' }) {
  return (
    <div
      className={`bg-[var(--bg)] rounded-xl border border-[var(--soft)] shadow-md text-[var(--text-primary)] ${className}`}
    >
      {children}
    </div>
  );
}

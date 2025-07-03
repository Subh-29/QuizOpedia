'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AdminDashboard = () => {
  const router = useRouter();
  // localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzci1rLUhLMzRubzFlUVJnbWRYU05VblMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTE1MjUyOTgsImV4cCI6MTc1MjEzMDA5OH0.VIq3mfOnvrnB1sHE7F9c8LoJ0RLCg8ZcYqP9dI_BZj8");

  const [selectedRange, setSelectedRange] = useState('1 Week');

  const timeRanges = ['1 Day', '1 Week', '1 Month', '3 Months'];

  const quizShowHandler = () => {
    
    router.push("/admin/quiz");
  }

  return (
    <div className=" p-6 bg-[var(--bg)] text-[var(--text-primary)]">
      <div className='py-2'>
        <h1 className='text-5xl font-semibold text-[var(--text-heading)]'>Dashboard</h1>
      </div>
      {/* Grid Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-[var(--primary)] shadow-md rounded-lg p-5">
          <h2 className="text-xl font-semibold text-[var(--text-heading)]">Total Users</h2>
          <p className="mt-2 text-3xl font-bold text-[var(--text-accent)]">12,310</p>
        </div>

        <div className="bg-[var(--primary)] shadow-md rounded-lg p-5">
          <h2 className="text-xl font-semibold text-[var(--text-heading)]">Total Quiz Takers</h2>
          <p className="mt-2 text-3xl font-bold text-[var(--text-accent)]">8,752</p>
        </div>

        <div className="bg-[var(--primary)] shadow-md rounded-lg p-5">
          <h2 className="text-xl font-semibold text-[var(--text-heading)]">New Users</h2>
          <p className="mt-2 text-3xl font-bold text-[var(--text-accent)]">541</p>
        </div>

        <div className="bg-[var(--primary)] shadow-md rounded-lg p-5">
          <h2 className="text-xl font-semibold text-[var(--text-heading)]">Total Quizzes</h2>
          <p className="mt-2 text-3xl font-bold text-[var(--text-accent)]">214</p>
        </div>
      </div>

      {/* User Overview Section */}
      <div className="bg-[var(--primary)] shadow-md rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-[var(--text-heading)]">User Overview</h3>
          <div className="flex gap-2">
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => setSelectedRange(range)}
                className={`px-3 py-1 rounded-md text-sm ${selectedRange === range
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--soft)] text-[var(--text-primary)]'
                  } transition-all duration-200`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Placeholder for Graph */}
        <div className="h-64 bg-[var(--soft)] rounded-md flex items-center justify-center text-[var(--text-secondary)]">
          {/* You can plug in recharts / chart.js here later */}
          <span>Graph showing user registrations over {selectedRange}</span>
        </div>
      </div>

      {/* Buttons below graph */}
      <div className="flex justify-center md:justify-end gap-4">
        <button
          onClick={quizShowHandler}
          className="px-6 py-3 rounded-md bg-[var(--accent)] text-white font-medium hover:bg-opacity-80 transition-all">
          View Quizzes
        </button>
        <button className="px-6 py-3 rounded-md bg-[var(--accent)] text-white font-medium hover:bg-opacity-80 transition-all">
          View Users
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;

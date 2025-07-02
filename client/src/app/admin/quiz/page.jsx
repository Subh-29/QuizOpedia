'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const QuizPage = () => {

  const router = useRouter();

  const [quizzes, setQuizzes] = useState([
    { id: 1, title: 'JavaScript Basics' },
    { id: 2, title: 'Operating Systems' },
    { id: 3, title: 'Data Structures' },
  ]);

  const handleEdit = (id) => {
    console.log('Edit quiz with id:', id);
    // route to edit page
  };

  const handleDelete = (id) => {
    const confirmed = confirm("Are you sure you want to delete this quiz?");
    if (confirmed) {
      setQuizzes(prev => prev.filter(q => q.id !== id));
    }
  };

  const manualQuizHandler = () => {
    router.push("/admin/quiz/create");
  }

  return (
    <div className=" p-6 bg-[var(--bg)] text-[var(--text-primary)]">
      {/* Top Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-4xl font-bold text-[var(--text-heading)]">Quiz Management</h1>
        <div className="flex w-full justify-evenly sm:justify-end gap-4 sm:gap-8 text-2xl">
          <button
            onClick={() => {
              router.push("/admin/quiz/create");
            }}
            className="bg-[var(--accent)] text-white px-5 py-2 rounded-md hover:bg-opacity-80 transition-all">
            Create Manually
          </button>
          <button
          onClick={() => {
              router.push("/admin/quiz/ai-create");
            }}
           className="bg-[var(--accent)] text-white px-5 py-2 rounded-md hover:bg-opacity-80 transition-all">
            AI Assisted
          </button>
        </div>
      </div>

      {/* Quiz Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-[var(--primary)] shadow-md rounded-lg p-5">
            <h2 className="text-lg font-semibold text-[var(--text-heading)]">{quiz.title}</h2>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => handleEdit(quiz.id)}
                className="px-4 py-1 text-sm bg-[var(--soft)] text-[var(--text-accent)] rounded-md hover:opacity-90"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(quiz.id)}
                className="px-4 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizPage;

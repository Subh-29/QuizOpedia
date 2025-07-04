'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleQuiz, deleteQuiz } from '@/redux/actions/quizAction';

export default function SingleQuizPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const { singleQuiz, loading } = useSelector((state) => state.quiz);

  useEffect(() => {
    if (id) {
      dispatch(getSingleQuiz(id));
    }
  }, [id, dispatch]);
  const optionName = ['A', 'B', 'C', 'D'];
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this quiz?')) {
      await dispatch(deleteQuiz(id));
      router.push('/admin/quiz'); // or wherever your list page is
    }
  };

  console.log("Id pls: ", id);
  
  const handleEdit = () => {
    console.log("In edit: ", id);

    router.push(`/admin/quiz/edit/${id}`);
  };

  if (loading || !singleQuiz) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[var(--primary)] rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[var(--text-heading)]">
          {singleQuiz.title}
        </h1>
        <div className="flex gap-4">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-[var(--accent)] text-white rounded hover:bg-opacity-80"
          >
            ✏️ Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-[var(--errors)] text-white rounded hover:bg-opacity-80"
          >
            🗑️ Delete
          </button>
        </div>
      </div>

      <p className="text-[var(--text-secondary)] mb-2">
        <strong>Topic:</strong> {singleQuiz.topic}
      </p>
      <p className="text-[var(--text-secondary)] mb-2">
        <strong>Tags:</strong> {singleQuiz.tags.join(', ')}
      </p>
      <p className="text-[var(--text-secondary)] mb-6">
        <strong>Time per question:</strong> {singleQuiz.timeLimit} seconds
      </p>

      <h2 className="text-xl font-semibold mb-4 text-[var(--text-heading)]">Questions</h2>

      <ul className="space-y-6 text-[var(--text-on-light)] ">
        {singleQuiz.questions.map((q, index) => (
          <li key={q.id} className="bg-[var(--soft)] p-4 rounded-lg border-l-4 border-[var(--accent)]">
            <p className="font-medium">{index + 1}. {q.text}</p>
            <div className=" pl-6 mt-2 text-[var(--text-on-light)]/70">
              {q.options.map((opt, i) => (
                  <div key={i} className=' flex gap-3.5'>
                    <p className=' font-extrabold'>{optionName[i]}.</p>
                  <p>{opt}</p>
                  </div>
              ))}
            </div>
            <p className="mt-2 text-sm font-extrabold text-green-600">
              ✅ Correct: <strong>{optionName[q.options.findIndex((opt) => opt == q.answer)]} {q.answer}</strong>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

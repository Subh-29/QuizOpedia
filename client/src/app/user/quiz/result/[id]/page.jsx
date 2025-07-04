// 'use client';

// import { useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import { useDispatch, useSelector } from 'react-redux';
// import { getQuizAttempt } from '@/redux/actions/attemptAction';

// export default function QuizResultPage() {
//   const { id } = useParams();
//   const dispatch = useDispatch();

//   const singQuiz = useSelector((state) => state?.attempt?.singleQuiz);
//   const loading = useSelector((state) => state?.attempt?.loading);
//   const error = useSelector((state) => state?.attempt?.error);
// console.log(singQuiz);

//   useEffect(() => {
//     dispatch(getQuizAttempt(id));
//   }, [dispatch, id]);

//   if (loading) return <p className="text-center mt-10 text-lg">Loading attempt...</p>;
//   if (error) return <p className="text-center mt-10 text-lg text-red-500">{error}</p>;
//   if (!singQuiz) return <p className="text-center mt-10 text-lg text-red-500">No attempt found.</p>;

//   const { quiz, question, answers, score } = singQuiz;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-[var(--primary)] text-[var(--text-primary)] rounded-xl shadow-md mt-10">
//       <h1 className="text-3xl font-bold mb-4 text-[var(--text-heading)]">
//         📝 {quiz.title}
//       </h1>
//       <p className="text-lg mb-6">
//         Your Score: <span className="font-bold text-[var(--accent)]">{score} / {question?.length}</span>
//       </p>

//       <div className="space-y-8">
//         {question?.map((q, idx) => {
//           const userAnswer = answers[q?.id];
//           const isCorrect = userAnswer === q?.answer;

//           return (
//             <div key={q.id} className="p-4 border rounded-lg bg-[var(--soft)]/30">
//               <h3 className="font-semibold mb-2">Q{idx + 1}. {q?.text}</h3>
//               <ul className="mb-2 space-y-1">
//                 {q.options.map((opt, i) => {
//                   const isSelected = opt === userAnswer;
//                   const isAnswer = opt === q.answer;

//                   return (
//                     <li
//                       key={i}
//                       className={`px-3 py-1 rounded-md border ${isAnswer ? 'border-green-500 bg-green-300/50' : isSelected ? 'bg-red-400/60' : '' } `}
//                     >
//                       {['A', 'B', 'C', 'D'][i]}. {opt}
//                     </li>
//                   );
//                 })}
//               </ul>

//               <p className={`text-sm font-semibold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
//                 Your answer: {userAnswer || 'N/A'} {isCorrect ? '✅' : `❌ (Correct: ${q.answer})`}
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizAttempt } from '@/redux/actions/attemptAction';
import { askAiForExplanation } from '@/redux/actions/aiAction';

export default function QuizResultPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const singQuiz = useSelector((state) => state?.attempt?.singleQuiz);
  const loading = useSelector((state) => state?.attempt?.loading);
  const error = useSelector((state) => state?.attempt?.error);

  const aiReplies = useSelector((state) => state?.ai?.explanations || {});
  const [openAiBox, setOpenAiBox] = useState({}); // Track which qn's AI is opened
  const [userPrompts, setUserPrompts] = useState({}); // Each qn's custom prompt
  // console.log("aiReplies ", aiReplies);
  
  useEffect(() => {
    dispatch(getQuizAttempt(id));
  }, [dispatch, id]);

  if (loading) return <p className="text-center mt-10 text-lg">Loading attempt...</p>;
  if (error) return <p className="text-center mt-10 text-lg text-red-500">{error}</p>;
  if (!singQuiz) return <p className="text-center mt-10 text-lg text-red-500">No attempt found.</p>;

  const { quiz, question, answers, score } = singQuiz;

  const handleAiSubmit = (q) => {
    const prompt = userPrompts[q.id] || `Explain why "${answers[q.id]}" is incorrect and "${q.answer}" is correct for: ${q.text}`;
    dispatch(askAiForExplanation({ question: q.text, userAnswer: answers[q.id], correctAnswer: q.answer, prompt }));
  };

  return (
    <div className=" max-w-8xl mx-auto p-6 bg-[var(--primary)] text-[var(--text-primary)] rounded-xl shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-4 text-[var(--text-heading)]">📝 {quiz.title}</h1>
      <p className="text-lg mb-6">
        Your Score: <span className="font-bold text-[var(--accent)]">{score} / {question?.length}</span>
      </p>

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
        {question?.map((q, idx) => {
          const userAnswer = answers[q?.id];
          const isCorrect = userAnswer === q?.answer;

          return (
            <div key={q.id} className="p-4 border rounded-lg bg-[var(--soft)]/30">
              <h3 className="font-semibold mb-2 text-xl">Q{idx + 1}. {q?.text}</h3>
              <ul className="mb-2 space-y-1">
                {q.options.map((opt, i) => {
                  const isSelected = opt === userAnswer;
                  const isAnswer = opt === q.answer;
                  return (
                    <li
                      key={i}
                      className={`px-3 py-1 rounded-md border ${isAnswer ? 'border-green-500 bg-green-300/50' : isSelected ? 'bg-red-400/60' : ''}`}
                    >
                      {['A', 'B', 'C', 'D'][i]}. {opt}
                    </li>
                  );
                })}
              </ul>

              <p className={`text-sm font-semibold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                Your answer: {userAnswer || 'N/A'} {isCorrect ? '✅' : `❌ (Correct: ${q.answer})`}
              </p>

              {!isCorrect && (
                <>
                  <button
                    onClick={() => setOpenAiBox(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                    className="mt-3 text-sm text-[var(--accent)] underline"
                  >
                    {openAiBox[q.id] ? 'Hide AI Help ❌' : 'Ask AI 🤖'}
                  </button>

                  {openAiBox[q.id] && (
                    <div className="mt-4 space-y-3">
                      <textarea
                        rows={3}
                        value={userPrompts[q.id] || ''}
                        onChange={(e) => setUserPrompts(prev => ({ ...prev, [q.id]: e.target.value }))}
                        placeholder="Type your question or let AI explain the correct answer..."
                        className="w-full border border-[var(--soft)] rounded-lg p-2 text-sm bg-[var(--bg)] text-[var(--text-primary)]"
                      />
                      <button
                        onClick={() => handleAiSubmit(q)}
                        className="bg-[var(--accent)] text-white px-4 py-2 rounded-md text-sm hover:bg-[var(--accent-dark)]"
                      >
                        Get Explanation 🚀
                      </button>

                      {aiReplies && (
                        <div className="p-3 border border-[var(--soft)] rounded-md bg-[var(--primary)] text-sm">
                          <strong>AI says:</strong>
                          <p>{aiReplies[q?.text]}</p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

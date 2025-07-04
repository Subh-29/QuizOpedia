'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import gsap from 'gsap';
import { answerQuestion, nextQuestion } from '../redux/reducers/attemptSlice';

export default function AttemptCard() {
  const dispatch = useDispatch();
  const { quizData, currentIndex, answers, finished } = useSelector((state) => state?.attempt);
  const question = quizData?.questions?.[currentIndex];

  const [selected, setSelected] = useState(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (!question) return;

    gsap.from('.question-block', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power2.out',
    });

    setSelected(null);
    setShowCorrect(false);
    setTimeLeft(30);

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t === 1) {
          clearInterval(timer);
          handleAnswer(null); // Time out
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleAnswer = (ans) => {
    if (showCorrect) return;
    setSelected(ans);
    setShowCorrect(true);
    dispatch(answerQuestion({ questionId: question.id, answer: ans }));

    setTimeout(() => {
      dispatch(nextQuestion());
    }, 2000);
  };

  if (finished) {
    return (
      <div className="p-6 bg-[var(--primary)] rounded-2xl text-center text-[var(--text-heading)] shadow-lg max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed 🎉</h2>
        <p className="text-[var(--text-secondary)]">
          You answered {Object.keys(answers).length} questions.
        </p>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="bg-[var(--primary)] text-[var(--text-primary)] p-6 rounded-2xl shadow-xl max-w-xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-[var(--text-secondary)]">
          Question {currentIndex + 1} of {quizData.questions.length}
        </p>
        <p className="text-sm font-bold text-[var(--accent)]">⏱️ {timeLeft}s</p>
      </div>

      <h3 className="text-lg font-semibold mb-4 question-block">{question.text}</h3>

      <div className="flex flex-col gap-3">
        {question.options.map((opt, idx) => {
          const isCorrect = showCorrect && opt === question.answer;
          const isWrong = showCorrect && selected === opt && opt !== question.answer;
          return (
            <button
              key={idx}
              onClick={() => handleAnswer(opt)}
              className={`px-4 py-3 rounded-xl border transition-all duration-300 text-left font-medium
                ${
                  selected === opt
                    ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                    : 'bg-white text-[var(--text-accent)] border-gray-300'
                }
                ${isCorrect ? 'bg-green-500 text-white border-green-500' : ''}
                ${isWrong ? 'bg-red-500 text-white border-red-500' : ''}
              `}
              disabled={showCorrect}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

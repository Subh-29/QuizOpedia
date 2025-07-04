'use client';

import getAllQuiz from '@/redux/actions/quizAction';
import { getMyAttempts } from '../../../redux/actions/attemptAction';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const UserQuizPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { quizzes } = useSelector((state) => state.quiz);
  const { attempts } = useSelector((state) => state.attempt);

  useEffect(() => {
    dispatch(getAllQuiz());
    dispatch(getMyAttempts());
  }, [dispatch]);

  // useEffect(() => {
  //   if (quizzes.length > 0) {
  //     const quizIds = quizzes.forEach((q) => dispatch(getMyAttempts(q.id)));
  //   }
  // }, [dispatch, quizzes]);
  const attemptedQuizIds = new Set(attempts?.map((a) => a?.quizId));

  return (
    <div className="p-6 bg-[var(--bg)] text-[var(--text-primary)]">
      <h1 className="text-4xl font-bold text-[var(--text-heading)] mb-6">Available Quizzes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes?.map((quiz) => {
          const isAttempted = attemptedQuizIds.has(quiz?.id);
          return (
            <div key={quiz.id} className={`relative flex flex-col ${isAttempted? "bg-[var(--primary)]/70" : "bg-[var(--primary)]"} shadow-md rounded-lg p-5 overflow-hidden`}>
              <div className={` flex justify-between ${!isAttempted? "flex-row-reverse" : ""} `}>

                {isAttempted ? (
                  <div className="absolute top-4 -right-7 transform rotate-45 bg-[var(--accent)] text-white text-xs font-bold px-6 py-1 shadow-lg z-10">
                    Attempted
                  </div>) :
                  (
                    <div className=" top-5 h-fit w-fit rounded-2xl -right-7 transform  bg-[var(--soft)]/70 text-[var(--text-on-light)] text-xs font-bold px-6 py-1 shadow-lg z-10">
                      Total Questions: {quiz.questions.length}
                    </div>)
                }
                <div>

                  <h2 className="text-lg font-semibold text-[var(--text-heading)]">{quiz.title}</h2>
                  <p className="text-sm text-[var(--text-secondary)] mt-2">{quiz.topic}</p>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                {isAttempted ?
                  <button
                    onClick={() => router.push(`/user/quiz/result/${quiz.id}`)}
                    className="px-4 py-2 text-sm bg-[var(--soft)] text-[var(--text-accent)] rounded-md hover:opacity-90 cursor-pointer"
                  >
                    View Score
                  </button> :
                  <button
                    onClick={() => router.push(`/user/quiz/attempt/${quiz.id}`)}
                    className="px-4 py-2 text-sm bg-[var(--soft)] text-[var(--text-accent)] rounded-md hover:opacity-90 cursor-pointer"
                  >
                    Attempt
                  </button>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserQuizPage;

'use client';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { answerQuestion, nextQuestion } from '@/redux/reducers/attemptSlice';
import gsap from 'gsap';
import { getSingleQuiz } from '@/redux/actions/quizAction';
import { useParams, useRouter } from 'next/navigation';
import { fetchQuizForAttempt, submitQuizAttempt } from '@/redux/actions/attemptAction';

const QuizCard = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const router = useRouter();

    const { singleQuiz, loading } = useSelector((state) => state.quiz);
    // console.log("iddd: ", id);

    useEffect(() => {
        if (id) {
            // console.log("ID: ", id);
            dispatch(fetchQuizForAttempt(id));
            dispatch(getSingleQuiz(id));
        }
    }, [id, dispatch]);

    const { quizData, currentIndex, answers } = useSelector((state) => state.attempt);
    const att = useSelector(state => state.attempt);
    // console.log("Quizdata: ", att);

    const [selected, setSelected] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const question = quizData?.questions?.[currentIndex];
    const timeLim = Number(quizData?.timeLimit);
    // console.log(timeLim);

    const lockNext = useRef(false); // Lock to prevent multiple nexts


    useEffect(() => {
        let timer;
        if (timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
        } else {
            handleNext();
        }
        return () => clearTimeout(timer);
    }, [timeLeft]);

    useEffect(() => {
        if (!quizData?.timeLimit) {
            return;
        }
        lockNext.current = false;
        gsap.fromTo(
            '#quiz-card',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );
        setTimeLeft(timeLim);
        setSelected(null);
    }, [currentIndex, quizData?.timeLimit]);

    const handleSelect = (opt) => {
        setSelected(opt);
        dispatch(answerQuestion({ questionId: question.id, answer: opt }));
        // setTimeout(handleNext, 1500); // show correct/incorrect for a bit
    };

    const handleNext = () => {
        if (lockNext?.current) {
            return;
        }
        lockNext.current = true;

        if (currentIndex === quizData?.questions?.length - 1) {
            const attemptData = {
                quizId: quizData.id,
                answers,
            };

            dispatch(submitQuizAttempt(attemptData));
            lockNext.current = false;
            router.push(`/user/quiz/result/${quizData.id}`); // or `/result/${quizData.id}`
        } else {
            dispatch(nextQuestion());
        }
    };

    // const isCorrect = selected && selected === question?.answer;

    return (
        <div className=" bg-[var(--bg)] flex items-center justify-center px-4">
            <div id="quiz-card" className="relative w-full max-w-md p-6 rounded-3xl bg-[var(--primary)] shadow-2xl">
                {/* Top bar */}
                <div className="flex justify-between items-center text-[var(--text-secondary)] mb-4">
                    <span>{String(currentIndex + 1).padStart(2, '0')} of {quizData?.questions?.length}</span>
                    <span className="font-semibold">⏱️ {timeLeft}s</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-[var(--soft)] rounded-full overflow-hidden mb-6">
                    <div
                        className="h-full bg-[var(--accent)] transition-all duration-500"
                        style={{ width: `${((currentIndex + 1) / quizData?.questions?.length) * 100}%` }}
                    ></div>
                </div>

                {/* Question Box */}
                <div className="bg-white text-black p-5 rounded-xl shadow-sm mb-4">
                    <p className="text-sm font-medium mb-1">{quizData?.topic || 'Quiz'}</p>
                    <h3 className="text-lg font-bold leading-snug">{question?.text}</h3>
                </div>

                {/* Options */}
                <div className="space-y-3">
                    {question?.options.map((opt, idx) => {
                        const isSelected = selected === opt;
                        const correct = opt === question.answer;

                        return (
                            <div
                                key={idx}
                                onClick={() => !selected && handleSelect(opt)}
                                className={`p-3 rounded-lg border cursor-pointer transition-all duration-300
                  ${selected && correct
                                        ? 'bg-green-100 border-green-500 text-green-800'
                                        : selected && isSelected
                                            ? 'bg-red-100 border-red-500 text-red-800'
                                            : 'bg-[var(--bg)] border-[var(--soft)] text-[var(--text-primary)] hover:bg-[var(--soft)]'
                                    }`
                                }
                            >
                                {opt}
                            </div>
                        );
                    })}
                </div>

                {/* Next Button */}
                {selected && (
                    <button
                        className="mt-6 w-full py-2 rounded-lg bg-[var(--accent)] text-white font-semibold shadow hover:opacity-90"
                        onClick={handleNext}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuizCard;

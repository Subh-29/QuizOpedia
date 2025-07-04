'use client';

import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { createQuiz } from '../../../../redux/actions/quizAction';
import { clearAiQuiz } from '../../../../redux/reducers/quizSlice';
import { useRouter } from 'next/navigation';

export default function CreateQuizForm() {
    const dispatch = useDispatch();
    const quiz = useSelector((state) => state.quiz.aiQuiz);
    const router = useRouter();

    const { register, control, handleSubmit, reset } = useForm({
        defaultValues: {
            topic: '',
            timePerQuestion: 30,
            questions: [],
        },
    });
    const watchedQuestions = useWatch({ control, name: 'questions' }); // real-time tracking

    const isLastQuestionComplete = () => {
        if (!watchedQuestions || watchedQuestions.length === 0) return true;

        const lastQ = watchedQuestions[watchedQuestions.length - 1];

        const isQuestionFilled = lastQ.text?.trim() !== '';
        const areOptionsFilled = Array.isArray(lastQ.options) &&
            lastQ.options.length === 4 &&
            lastQ.options.every((opt) => opt?.label?.trim?.() !== '');
        const isAnswerSelected = lastQ.answer?.trim() !== '';

        return isQuestionFilled && areOptionsFilled && isAnswerSelected;
    };

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'questions',
    });

    useEffect(() => {
        if (quiz?.questions?.length) {
            reset({
                topic: quiz.topic,
                timePerQuestion: 30,
                questions: quiz.questions.map(q => ({
                    text: q.text,
                    options: q.options.map(opt => ({ label: opt })), // ✅ fixed shape
                    answer: q.answer,
                })),
            });
            dispatch(clearAiQuiz());
        }
    }, [quiz, reset]);

    const onSubmit = async (data) => {
        data.questions = data.questions.map(q => ({
            ...q,
            options: q.options.map(opt => opt.label || ''), // ✅ flatten back
        }));
        data.tags = quiz?.tags || [data.topic];
        data.title = (quiz?.topic || data.topic) + " Quiz";

        console.log(data);
        try {
            await dispatch(createQuiz(data));
            router.push("/admin/quiz")
        } catch (error) {
            console.error("💥 error while creating quiz: ", error);
        }
    };

    const deleteQnHandler = (idx) => remove(idx);

    const addEmptyQuestion = () => {
        append({
            text: '',
            options: [{ label: '' }, { label: '' }, { label: '' }, { label: '' }],
            answer: '',
        });
    };

    return (
        <div className="max-w-5xl mx-auto mt-10 px-6 py-8 bg-[var(--primary)] rounded-xl shadow-md border border-[var(--soft)]">
            <h2 className="text-3xl font-bold mb-6 text-[var(--text-heading)] tracking-tight">
                Create a New Quiz
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Quiz Topic */}
                <div>
                    <label className="block text-[var(--text-primary)] font-semibold mb-2">Quiz Topic</label>
                    <input
                        {...register('topic')}
                        placeholder="e.g. Web Security, Data Structures"
                        className="w-full bg-[var(--bg)] border border-[var(--soft)] px-4 py-3 rounded-md text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    />
                </div>

                {/* Time Per Question */}
                <div>
                    <label className="block text-[var(--text-primary)] font-semibold mb-2">Time per Question (in seconds)</label>
                    <input
                        type="number"
                        {...register('timePerQuestion')}
                        placeholder="30"
                        className="w-full bg-[var(--bg)] border border-[var(--soft)] px-4 py-3 rounded-md text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    />
                </div>

                {/* Questions */}
                <div className="space-y-10">
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="p-6 bg-[var(--soft)]/70 border border-[var(--accent)] flex flex-col gap-2 rounded-lg shadow-sm"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold text-[var(--text-on-light)]">
                                    Q{index + 1}
                                </h3>
                                <span
                                    onClick={() => deleteQnHandler(index)}
                                    className="px-2 rounded-xl bg-[var(--errors)] md:hover:bg-[var(--errors)]/80 active:scale-96 cursor-pointer"
                                >
                                    Delete
                                </span>
                            </div>

                            {/* Question Text */}
                            <input
                                {...register(`questions.${index}.text`)}
                                placeholder="Write your question here..."
                                className="w-full bg-[var(--primary)] border border-[var(--accent)] px-4 py-2 rounded-md text-[var(--text-primary)] mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                            />

                            {/* Options */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {['A', 'B', 'C', 'D'].map((opt, optIndex) => (
                                    <div key={optIndex}>
                                        <label className="block text-sm font-medium text-[var(--text-on-light)] mb-1">
                                            Option {opt}
                                        </label>
                                        <input
                                            {...register(`questions.${index}.options.${optIndex}.label`)} // ✅ correct path
                                            placeholder={`Option ${opt}`}
                                            className="w-full bg-[var(--primary)] border border-[var(--soft)] px-4 py-2 rounded-md text-[var(--text-primary)] focus:outline-none"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Correct Answer */}
                            <div className="mt-4">
                                <label className="block text-sm font-semibold text-[var(--text-on-light)] mb-1">
                                    Correct Answer
                                </label>
                                <select
                                    {...register(`questions.${index}.answer`)}
                                    className="w-full bg-[var(--primary)]/70 border border-[var(--accent)] px-4 py-2 rounded-md"
                                >
                                    <option value="">Select the correct answer</option>
                                    {watchedQuestions?.[index]?.options?.map((opt, i) => (
                                        <option key={i} value={opt?.label || ''}>
                                            {['A', 'B', 'C', 'D'][i]} - {opt?.label || ''}
                                        </option>
                                    ))}
                                </select>

                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Question */}
                <button
                    type="button"
                    onClick={addEmptyQuestion}
                    disabled={!isLastQuestionComplete()}
                    className={`inline-block px-6 py-3 rounded-lg font-semibold transition-all duration-200 cursor-pointer
    ${isLastQuestionComplete()
                            ? 'bg-[var(--accent)] text-white hover:bg-[var(--text-accent)]'
                            : 'bg-gray-400 text-white opacity-70 cursor-not-allowed'}
  `}
                >
                    ➕ Add More Question
                </button>


                {/* Submit */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="bg-[var(--text-accent)] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[var(--accent)] transition-all duration-200 cursor-pointer"
                    >
                        🚀 Save Quiz
                    </button>
                </div>
            </form>
        </div>
    );
}

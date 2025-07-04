'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import getAllQuiz, { editQuiz, getSingleQuiz } from '../../../../../redux/actions/quizAction';
import { useParams, useRouter } from 'next/navigation';

export default function EditQuizForm() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const checkqz = useSelector(state => state.quiz);
    // console.log(checkqz);
    const router = useRouter();
    const quiz = useSelector((state) => state.quiz.singleQuiz);

    useEffect(() => {
        if (!quiz || quiz.id !== id) {
            dispatch(getSingleQuiz(id));
        }
    }, [quiz, id, dispatch]);

    // console.log(quiz);

    const { register, control, handleSubmit, reset } = useForm({
        defaultValues: {
            topic: '',
            timePerQuestion: 30,
            questions: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'questions',
    });

    useEffect(() => {
        if (!quiz) dispatch(getSingleQuiz(id));
        if (quiz?.questions?.length) {
            reset({
                topic: quiz.topic,
                timePerQuestion: quiz.timeLimit || 30,
                questions: quiz.questions.map((q) => ({
                    text: q.text,
                    options: q.options,
                    answer: q.answer,
                })),
            });
        }
    }, [quiz, reset, id]);

    const onSubmit = async (data) => {
        try {
            await dispatch(editQuiz(id, data));
            router.push(`/admin/quiz/singleQuiz/${id}`);
        } catch (error) {
            console.log("Error updating quiz:", error);
        }
    };

    const addEmptyQuestion = () => {
        append({ text: '', options: ['', '', '', ''], answer: '' });
    };

    return (
        <div className="max-w-5xl mx-auto mt-10 px-6 py-8 bg-[var(--primary)] rounded-xl shadow-md border border-[var(--soft)]">
            <h2 className="text-3xl font-bold mb-6 text-[var(--text-heading)] tracking-tight">
                ✏️ Edit Quiz
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div>
                    <label className="block text-[var(--text-primary)] font-semibold mb-2">Quiz Topic</label>
                    <input {...register('topic')} className="w-full bg-[var(--bg)] border border-[var(--soft)] px-4 py-3 rounded-md text-[var(--text-primary)]" />
                </div>

                <div>
                    <label className="block text-[var(--text-primary)] font-semibold mb-2">Time per Question</label>
                    <input type="number" {...register('timePerQuestion')} className="w-full bg-[var(--bg)] border border-[var(--soft)] px-4 py-3 rounded-md text-[var(--text-primary)]" />
                </div>

                {fields.map((field, index) => (
                    <div key={field.id} className="p-6 bg-[var(--soft)]/70 border border-[var(--accent)] rounded-lg shadow-sm">
                        <div className='flex justify-between items-center'>
                            <h3 className="text-xl font-semibold text-[var(--text-on-light)]">Q{index + 1}</h3>
                            <span onClick={() => remove(index)} className='px-2 rounded-xl bg-[var(--errors)] cursor-pointer'>Delete</span>
                        </div>

                        <input {...register(`questions.${index}.text`)} placeholder="Question text" className="w-full bg-[var(--primary)] border border-[var(--accent)] px-4 py-2 rounded-md text-[var(--text-primary)] mt-2" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            {[0, 1, 2, 3].map((i) => (
                                <input
                                    key={i}
                                    {...register(`questions.${index}.options.${i}`)}
                                    placeholder={`Option ${String.fromCharCode(65 + i)}`}
                                    className="w-full bg-[var(--primary)] border border-[var(--soft)] px-4 py-2 rounded-md text-[var(--text-primary)]"
                                />
                            ))}
                        </div>

                        <div className="mt-4">
                            <label className="text-sm font-semibold text-[var(--text-on-light)] mb-1">Correct Answer</label>
                            <select {...register(`questions.${index}.answer`)} className="w-full bg-[var(--primary)] border border-[var(--accent)] px-4 py-2 rounded-md">
                                <option value=''>Select the correct answer</option>
                                {['A', 'B', 'C', 'D'].map((opt, i) => (
                                    <option key={i} value={fields[index]?.options?.[i] || ''}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}

                <button type="button" onClick={addEmptyQuestion} className="bg-[var(--accent)] text-white font-semibold px-6 py-3 rounded-lg">
                    ➕ Add Question
                </button>

                <div className="pt-4">
                    <button type="submit" className="bg-[var(--text-accent)] text-white font-semibold px-8 py-3 rounded-lg">
                        💾 Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}

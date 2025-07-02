'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function EditQuizForm() {
  const { id } = useParams(); // Get quiz ID from route
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      topic: '',
      timePerQuestion: '',
      questions: [],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'questions',
  });

  // 🧠 Fetch existing quiz data on mount
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`/api/quiz/${id}`);
        const { topic, timePerQuestion, questions } = res.data;
        reset({
          topic,
          timePerQuestion,
          questions,
        });
      } catch (err) {
        console.error('Failed to fetch quiz:', err);
      }
    };

    fetchQuiz();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`/api/quiz/${id}`, data);
      alert('Quiz updated successfully ✅');
    } catch (err) {
      console.error('Failed to update quiz:', err);
    }
  };

  const addEmptyQuestion = () => {
    append({
      text: '',
      options: ['', '', '', ''],
      answer: '',
    });
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 px-6 py-8 bg-[var(--primary)] rounded-xl shadow-md border border-[var(--soft)]">
      <h2 className="text-3xl font-bold mb-6 text-[var(--text-heading)] tracking-tight">
        ✏️ Edit Quiz
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* Quiz Topic */}
        <div>
          <label className="block text-[var(--text-primary)] font-semibold mb-2">Quiz Topic</label>
          <input
            {...register('topic')}
            placeholder="e.g. Operating Systems"
            className="w-full bg-[var(--bg)] border border-[var(--soft)] px-4 py-3 rounded-md text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>

        {/* Time per Question */}
        <div>
          <label className="block text-[var(--text-primary)] font-semibold mb-2">Time per Question (in seconds)</label>
          <input
            type="number"
            {...register('timePerQuestion')}
            className="w-full bg-[var(--bg)] border border-[var(--soft)] px-4 py-3 rounded-md text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>

        {/* Questions */}
        <div className="space-y-10">
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="p-6 bg-[var(--soft)]/70 border border-[var(--accent)] rounded-lg shadow-sm"
                        >
                            <h3 className="text-xl font-semibold mb-4 text-[var(--text-on-light)]">
                                Q{index + 1}
                            </h3>

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
                                            {...register(`questions.${index}.options.${optIndex}`)}
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
                                    className="w-full bg-[var(--primary)] border border-[var(--accent)] px-4 py-2 rounded-md"
                                >
                                    <option value="">Select the correct answer</option>
                                    {['A', 'B', 'C', 'D'].map((opt, i) => (
                                        <option
                                            key={opt}
                                            value={fields[index]?.options?.[i] || ''}
                                            className=' bg-(--accent)/60'
                                        >
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}
                </div>

        {/* Add More */}
        <button
          type="button"
          onClick={addEmptyQuestion}
          className="inline-block bg-[var(--accent)] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[var(--text-accent)] transition-all duration-200"
        >
          ➕ Add Question
        </button>

        {/* Submit */}
        <div className="pt-6">
          <button
            type="submit"
            className="bg-[var(--text-accent)] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[var(--accent)] transition-all duration-200"
          >
            ✅ Update Quiz
          </button>
        </div>
      </form>
    </div>
  );
}

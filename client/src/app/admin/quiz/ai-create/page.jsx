'use client';

import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { generateAIRes } from '@/redux/actions/quizAction';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const AIGeneratedQuizPage = () => {
  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      topic: '',
      numOfQn: 0
    }
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const handleGenerate = async (formdata) => {

    if (!formdata.topic || !formdata.numOfQn) return alert('Fill all fields');

    try {
      setLoading(true);

      console.log(formdata);

      await dispatch(generateAIRes(formdata))
      reset();
      router.push("/admin/quiz/create");
      // setQuestions(res.data.questions);
    } catch (err) {
      console.error('AI generation failed:', err);
      alert('Error generating quiz');
    } finally {
      setLoading(false);

    }
  };

  return (
    <div className="bg-[var(--bg)] text-[var(--text-primary)] py-10 px-4 ">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-[var(--text-heading)] text-center">
          AI Assisted Quiz Generation
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit(handleGenerate)} className="bg-[var(--primary)] shadow-md p-6 rounded-lg mb-10">
          <label className="block mb-2 font-medium">Topic</label>
          <input
            type="text"
            {...register("topic", { required: "Topic Name is reqd" })}
            className="w-full px-4 py-2 mb-4 border rounded-md bg-[var(--soft)] text-[var(--text-dark)]"
            placeholder="e.g., Cybersecurity"
          />

          <label className="block mb-2 font-medium">Number of Questions</label>
          <input
            type="number"
            {...register("numOfQn", { required: "Number of questions is reqd" })}
            className="w-full px-4 py-2 mb-4 border rounded-md bg-[var(--soft)] text-[var(--text-dark)]"
            min={1}
            max={20}
          />

          <button
            disabled={loading}
            className="bg-[var(--accent)] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-all cursor-pointer"
          >
            {loading ? 'Generating...' : 'Generate Quiz'}
          </button>
        </form>

        {/* Generated Questions */}
        {/* {questions.length > 0 && (
          <div className="bg-[var(--primary)] p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-[var(--text-heading)]">
              Generated Questions
            </h2>
            <ul className="space-y-4">
              {questions.map((q, index) => (
                <li key={index} className="border-l-4 border-[var(--accent)] pl-4 py-2">
                  <p className="font-medium">{index + 1}. {q.text}</p>
                  <ul className="list-disc pl-6 text-[var(--text-secondary)] mt-1">
                    {q.options.map((opt, i) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-sm text-green-600">
                    ✅ Correct: <strong>{q.answer}</strong>
                  </p>
                </li>
              ))}
            </ul>

            <button className="mt-6 bg-[var(--accent)] text-white px-6 py-2 rounded-md hover:bg-opacity-90">
              Save Quiz
            </button>
          </div>
        )} */}
      </div>
    </div>
  );

};

export default AIGeneratedQuizPage;

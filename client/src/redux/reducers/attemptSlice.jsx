// store/attemptSlice.js
import { createSlice } from '@reduxjs/toolkit';

const attemptSlice = createSlice({
  name: 'attempt',
  initialState: {
    quizData: null,
    currentIndex: 0,
    answers: {},
    finished: false,
    attempts: [],
    loading: false,
    error: null,
    singleQuiz: null
  },
  reducers: {
    setQuizData: (state, action) => {
      state.quizData = action.payload;
      state.currentIndex = 0;
      state.answers = {};
      state.finished = false;
    },
    answerQuestion: (state, action) => {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    },
    nextQuestion: (state) => {
      if (state.quizData && state.currentIndex < state.quizData.questions.length - 1) {
        state.currentIndex++;
      } else {
        state.finished = true;
      }
    },
    resetAttempt: (state) => {
      state.quizData = null;
      state.currentIndex = 0;
      state.answers = {};
      state.finished = false;
    },
    setAttempts: (state, action) => {
      state.attempts = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSingleQuiz: (state, action) => {
      state.singleQuiz = action.payload;
    }
  },
});

export const {
  setQuizData,
  answerQuestion,
  nextQuestion,
  resetAttempt,
  setAttempts,
  setLoading,
  setError,
  setSingleQuiz

} = attemptSlice.actions;

export default attemptSlice.reducer;

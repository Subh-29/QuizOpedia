import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    quizzes: [],
    loading: true,
    error: null,
    singleQuiz: null,
    //AI generated quiz
    aiQuiz: null,
}

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },

        setSingleQuiz: (state, action) => {
            state.singleQuiz = action.payload
        },
        //AI Quiz slices

        setAiQuiz: (state, action) => {
            state.aiQuiz = action.payload;
        },
        clearAiQuiz: (state) => {
            state.aiQuiz = null;
        }
    },
});


export const { setQuizzes, setLoading, setError,setSingleQuiz, setAiQuiz, clearAiQuiz } = quizSlice.actions;
export default quizSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    quizzes: [],
    loading: true,
    error: null
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
        }
    },
});


export const { setQuizzes, setLoading, setError } = quizSlice.actions;
export default quizSlice.reducer;

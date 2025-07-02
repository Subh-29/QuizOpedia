import { configureStore } from "@reduxjs/toolkit";
import quizReducer from './reducers/quizSlice'


const Store = configureStore({
    reducer: {
        quiz: quizReducer,
    }
});

export default Store;
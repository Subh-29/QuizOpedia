import { configureStore } from "@reduxjs/toolkit";
import quizReducer from './reducers/quizSlice'
import userReducer from './reducers/userSlice'
import attemptReducer from './reducers/attemptSlice'
import aiReducer from './reducers/aiSlice'

const Store = configureStore({
    reducer: {
        quiz: quizReducer,
        user: userReducer,
        attempt: attemptReducer,
        ai: aiReducer
    }
});

export default Store;
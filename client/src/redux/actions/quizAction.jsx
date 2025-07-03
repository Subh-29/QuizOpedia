import axios from '../../api/axiosconfig';
import { setQuizzes } from '../reducers/quizSlice';

const getAllQuiz = () => async (dispatch) => {
    try {
        console.log("HELLOOOOO");
        
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/quiz/all", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        // console.log(res);
        dispatch(setQuizzes(res.data))
    } catch (error) {
        console.log(error);
    }
}

export const createQuiz = (data) => async (dispatch) => {
    try {
        const res = await axios.post("/api/quiz/create", data, {
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzci1rLUhLMzRubzFlUVJnbWRYU05VblMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTE1MjUyOTgsImV4cCI6MTc1MjEzMDA5OH0.VIq3mfOnvrnB1sHE7F9c8LoJ0RLCg8ZcYqP9dI_BZj8",
                "Content-Type": "application/json"
            }
        })

        console.log("Quiz created: ", res);
        
    } catch (error) {
        console.log(error);
        
    }
}


export default getAllQuiz;
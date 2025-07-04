import axios from '../../api/axiosconfig';
import { setQuizzes, setAiQuiz, setLoading, setSingleQuiz, setError } from '../reducers/quizSlice';

const getAllQuiz = () => async (dispatch) => {
  try {

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

export const generateAIRes = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post("/api/quiz/ai-assist", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    const quiz = res.data.quiz;
    console.log(quiz);
    dispatch(setAiQuiz(quiz));
    // localStorage.setItem("quiz", quiz);

    console.log("GOt the aiiiiiii");

  } catch (error) {
    console.log(error);

  }
}

export const createQuiz = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post("/api/quiz/create", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })

    console.log("Quiz created: ", res);

  } catch (error) {
    console.log(error);

  }
}

// 👇 GET single quiz by ID
export const getSingleQuiz = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    console.log(id);

    const res = await axios.get(`/api/quiz/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    dispatch(setSingleQuiz(res.data)); // wrapped in array for consistency
  } catch (error) {
    console.error("❌ Failed to fetch quiz:", error);
    dispatch(setError(error.response?.data?.error || "Something went wrong"));
  } finally {
    dispatch(setLoading(false));
  }
};

// 👇 PUT — Edit quiz
export const editQuiz = (id, updatedData) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/quiz/${id}`, updatedData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // Optional: update the quizzes in state if needed
    dispatch(getSingleQuiz(id)); // refresh that quiz
  } catch (error) {
    console.error("❌ Failed to update quiz:", error);
    dispatch(setError(error.response?.data?.error || "Something went wrong"));
  }
};

// 👇 DELETE — Delete quiz
export const deleteQuiz = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/quiz/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // Optional: refresh quiz list
    dispatch(getAllQuiz());
  } catch (error) {
    console.error("❌ Failed to delete quiz:", error);
    dispatch(setError(error.response?.data?.error || "Something went wrong"));
  }
};

export default getAllQuiz;
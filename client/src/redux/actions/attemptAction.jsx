// store/attemptAction.jsx
import axios from '@/api/axiosconfig';
import {
  setQuizData,
  answerQuestion,
  nextQuestion,
  resetAttempt,
  setAttempts,
  setLoading,
  setError,
  setSingleQuiz
} from '../reducers/attemptSlice';
import { userStatsSuccess, userStatsFail } from '../reducers/userSlice';
// import { setSingleQuiz } from '../reducers/quizSlice';

export const fetchQuizForAttempt = (quizId) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem("token") || getState().user;
    const { data } = await axios.get(`/api/quiz/${quizId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("Setting quiz data: ", data);
    
    dispatch(setQuizData(data));
  } catch (err) {
    console.error('[Fetch Quiz Error]', err);
    // Optionally: dispatch error state here if needed
  }
};

export const getQuizAttempt = (quizId) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem("token") || getState().user;
    const {data} = await axios.get(`/api/attempt/my/${quizId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    // console.log("Attempt ", data);
    
    dispatch(setSingleQuiz(data));
    
  } catch (error) {
    console.error(error);
    
  }
}

export const submitQuizAttempt = (attData) => async (dispatch, getState) => {
  try {
    // const { answers } = getState().attempt;
    const token = localStorage.getItem("token");

    const { data } = await axios.post(
      `/api/attempt`,
      attData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }
    );

    // Optionally fetch updated user stats
    const statsRes = await axios.get(`/api/attempt/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(userStatsSuccess(statsRes.data));

    dispatch(resetAttempt());
    return data;
  } catch (err) {
    console.error('[Submit Attempt Error]', err);
    dispatch(userStatsFail('Failed to submit attempt'));
  }
};

export const getMyAttempts = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));

    const token = localStorage.getItem('token');
    const { data } = await axios.get('/api/attempt/my', {
      headers: { Authorization: `Bearer ${token}` }
    });

    dispatch(setAttempts(data));
  } catch (err) {
    dispatch(setError(err.response?.data?.error || 'Failed to fetch attempts'));
  } finally {
    dispatch(setLoading(false));
  }
};

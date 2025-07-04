import axios from '../../api/axiosconfig';
import { setExplanation } from '../reducers/aiSlice';

export const askAiForExplanation = ({ question, userAnswer, correctAnswer, prompt }) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/ai/explain', {
      question,
      userAnswer,
      correctAnswer,
      prompt,
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        }
    });
    // console.log("data ai: ", data);
    
    dispatch(setExplanation({ qid: question, response: data.text }));
  } catch (err) {
    console.error('AI Error: ', err);
    dispatch(setExplanation({ qid: question, response: 'AI failed to respond. Try again later.' }));
  }
};

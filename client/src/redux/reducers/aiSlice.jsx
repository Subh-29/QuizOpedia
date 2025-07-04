import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  explanations: {},
};

export const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    setExplanation: (state, action) => {
      const { qid, response } = action.payload;
      state.explanations[qid] = response;
    },
  },
});

export const { setExplanation } = aiSlice.actions;
export default aiSlice.reducer;

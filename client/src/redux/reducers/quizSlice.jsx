import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    data: [],
}

const quizSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loaduser: (state, action) => {
            // console.log("state: ", state);
            // console.log("Action: ", action);
            state.data = action.payload;
            // console.log(state);
            
        },
    },
});


export const { loaduser } = quizSlice.actions;
export default quizSlice.reducer;

// store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    token: null,
    loading: false,
    error: null,
    stats: null,
  },
  reducers: {
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.user;
      state.token = action.payload.token;
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.user;
      state.token = action.payload.token;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      state.error = null;
      state.loading = false;
      state.stats = null;
    },
    userStatsSuccess: (state, action) => {
      state.stats = action.payload;
    },
    userStatsFail: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFail,
  loginStart,
  loginSuccess,
  loginFail,
  logout,
  userStatsSuccess,
  userStatsFail,
} = userSlice.actions;
export default userSlice.reducer;

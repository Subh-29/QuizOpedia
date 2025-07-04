// store/userAction.js
import axios from '../../api/axiosconfig';
import {
  registerStart, registerSuccess, registerFail, loginStart, loginSuccess, loginFail, logout as logoutAction,
  userStatsSuccess,
  userStatsFail
} from '../../redux/reducers/userSlice';

// REGISTER
export const registerUser = (userData) => async (dispatch) => {
  dispatch(registerStart());
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data = await axios.post('/api/auth/signup', userData, config);

    dispatch(registerSuccess(data));
    localStorage.setItem('token', JSON.stringify(data.token));
  } catch (error) {
    dispatch(
      registerFail(
        error.response?.data?.error || 'Registration failed, please try again.'
      )
    );
  }
};

// LOGIN
export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/auth/login', credentials, config);

    dispatch(loginSuccess(data));
    console.log("in action ", data);
    const token = data.token
    localStorage.setItem('token', token);
  } catch (error) {
    
    dispatch(
      loginFail(
        error.response?.data?.error || 'Login failed, please check your credentials.'
      )
    );
    throw new Error("Maybe bad creds?");
  }
};

// LOGOUT
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logoutAction());
};



export const fetchUserStats = () => async (dispatch, getState) => {
  try {
    const { token } = getState().user;
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const { data } = await axios.get('/api/user/stats', config);
    dispatch(userStatsSuccess(data));
  } catch (error) {
    dispatch(userStatsFail(error.response?.data?.error || 'Failed to fetch user stats'));
  }
};
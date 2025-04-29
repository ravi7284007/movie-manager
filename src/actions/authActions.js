import API from '../utils/api';

export const loginUser = (email, password) => async dispatch => {
  dispatch({ type: 'LOGIN_REQUEST' });
  try {
    const res = await API.get(`/users?email=${email}&password=${password}`);
    if (res.data.length > 0) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data[0] });
    } else {
      dispatch({ type: 'LOGIN_FAILURE', error: 'Invalid credentials' });
    }
  } catch (err) {
    dispatch({ type: 'LOGIN_FAILURE', error: err.message });
  }
};

export const logout = () => (dispatch) => {
    dispatch({ type: "LOGOUT" });
  };
  
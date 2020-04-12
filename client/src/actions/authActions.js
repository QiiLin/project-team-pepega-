import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

axios.defaults.xsrfHeaderName = "x-csrf-token";
axios.defaults.xsrfCookieName = "X-XSRF-TOKEN"
axios.defaults.withCredentials = true;

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });
  // const isAuth = getState().auth.isAuth;
    axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res =>{
      console.log(res.data)
      if (res.data.isNotAuth) {
        dispatch({
          type: AUTH_ERROR
        });
      } else {
        dispatch({
          type: USER_LOADED,
          payload: res.data
        })
      }
    }

    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });

};

// Register user
export const register = ({ name, email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post("/api/users", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// Login user
export const login = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post("/api/auth", body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// Logout user
export const logout = () => dispatch => {
    // Headers
    axios
      .post("/api/users/logout",{}, tokenConfig())
      .then(res =>
        dispatch({
          type: LOGOUT_SUCCESS
        })
      )
      .catch(err => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
        );
        dispatch({
          type: LOGIN_FAIL
        });
      });
};

// Setup config/headers and token
export const tokenConfig = getState => {

  // Headers
  const config = {
    // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    headers: {
      "Content-type": "application/json"
    }
  };

  // If token, add to headers
  config.withCredentials = true;
  return config;
};

// Setup config/headers and token
export const tokenConfig2 = getState => {
  // Headers
  const config = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  };

  // If token, add to headers
  config.withCredentials = true;
  return config;
};

import axios from "axios";
import {returnErrors} from "./errorActions";
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

/**
 * Thisfunction fires request to backend,
 * if the user login, then load user data. 
 * if the user not login, then display the
 * init page 
 */
export const loadUser = () => (dispatch, getState) => {
  // Dispatch event to sign user is loading
  dispatch({type: USER_LOADING});
  // Uitlized axios to make request to backend
  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res => {
      // if it not authenticate
      if (res.data.isNotAuth) {
        dispatch({type: LOGOUT_SUCCESS});
      } else {
        dispatch({type: USER_LOADED, payload: res.data})
      }
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({type: AUTH_ERROR});
    });
};

/**
 * This function fires the user registeration request
 * Base on the result status dispatch different event
 * @param name
 * @param email
 * @param password
 */
export const register = ({name, email, password}) => (dispatch, getState) => {
  // build the request body
  const body = JSON.stringify({name, email, password});

  axios
    .post("/api/users", body, tokenConfig(getState))
    .then(res => dispatch({type: REGISTER_SUCCESS, payload: res.data}))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, "REGISTER_FAIL"));
      dispatch({type: REGISTER_FAIL});
    });
};

/**
 * This function fires the login api call,
 * and based on the result status dispatch different event
 * @param email
 * @param password
 */
export const login = ({email, password}) => (dispatch, getState) => {
  // build the request body
  const body = JSON.stringify({email, password});

  axios
    .post("/api/auth", body, tokenConfig(getState))
    .then(res => dispatch({type: LOGIN_SUCCESS, payload: res.data}))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, "LOGIN_FAIL"));
      dispatch({type: LOGIN_FAIL});
    });
};

/**
 * This function first logout api and 
 * and based on the result status dispatch different event
 */
export const logout = () => (dispatch, getState)=> {
  // Headers
  axios.post("/api/users/logout", {}, tokenConfig(getState))
    .then(res => dispatch({type: LOGOUT_SUCCESS}))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, "LOGIN_FAIL"));
      dispatch({type: LOGIN_FAIL});
    });
};

// Setup config/headers and token with json content
export const tokenConfig = getState => {

  // Headers
  const config = {
    // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    headers: {
      "Content-type": "application/json"
    }
  };

  // Enable send with cookies and sessions
  config.withCredentials = true;
  return config;
};

// Setup config/headers and token with form content
export const tokenConfig2 = getState => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  // Enable send with cookies and sessions
  config.withCredentials = true;
  return config;
};

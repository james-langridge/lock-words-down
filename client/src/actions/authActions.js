import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

// TODO: what's the point in having a file of strings?
// TODO: The type field should be a string that gives this action a descriptive name,
// like "todos/todoAdded". We usually write that type string like
// "domain/eventName", where the first part is the feature or category that
// this action belongs to, and the second part is the specific thing that
// happened.
// https://redux.js.org/tutorials/essentials/part-1-overview-concepts#actions
// import {
//   GET_ERRORS,
//   SET_CURRENT_USER,
//   USER_LOADING
// } from "./types";

// These functions are action creators
// https://redux.js.org/tutorials/essentials/part-1-overview-concepts#action-creators

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: 'getErrors',
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localstorage

      // Set token to localstorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: 'getErrors',
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: 'auth/setCurrentUser',
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: 'auth/userLoading'
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

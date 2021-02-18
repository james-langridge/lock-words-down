import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import wordReducer from "./wordReducers";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  words: wordReducer
});

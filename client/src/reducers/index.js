import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import wordReducer from "./wordReducers";
import selectionReducer from "./selectionReducers";
import gameReducer from "./gameReducers";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  words: wordReducer,
  selections: selectionReducer,
  game: gameReducer,
});

import { combineReducers } from "redux";
import authReducer from "./authentication/authReducers";
import errorReducer from "./error/errorReducers";
import wordReducer from "./word/wordReducers";
import selectionReducer from "./selection/selectionReducers";
import gameReducer from "./game/gameReducers";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  words: wordReducer,
  selections: selectionReducer,
  game: gameReducer,
});

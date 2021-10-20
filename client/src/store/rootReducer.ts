import { combineReducers } from "redux";
import authReducers from "./authentication/authentication.reducers";
import gameReducers from "./game/game.reducers";
import selectionReducers from "./selection/selection.reducers";
import wordReducers from "./word/word.reducers";
import studentReducers from "./student/student.reducers";

export default combineReducers({
  auth: authReducers,
  game: gameReducers,
  selections: selectionReducers,
  words: wordReducers,
  students: studentReducers,
});

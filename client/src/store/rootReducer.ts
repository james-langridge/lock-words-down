import { combineReducers } from "redux";
import authReducer from "./authentication/authentication.reducers";
import gameReducer from "./game/game.reducers";
import selectionReducer from "./selection/selection.reducers";
import wordReducer from "./word/word.reducers";

export default combineReducers({
  auth: authReducer,
  game: gameReducer,
  selections: selectionReducer,
  words: wordReducer,
});

import { TermEntry } from "../../types/terms.types";

type WordsState = {
  selectedWords: TermEntry[];
  wordList: TermEntry[];
};

const initialState: WordsState = {
  selectedWords: [],
  wordList: [],
};

type SelectWordActions = {
  type: "selectWord" | "unselectWord";
  payload: TermEntry;
};

type SetWordListAction = {
  type: "setWordList";
  payload: TermEntry[];
};

type UnselectAllWordsAction = {
  type: "unselectAllWords";
};

type Actions = SelectWordActions | SetWordListAction | UnselectAllWordsAction;

export default function (state: WordsState = initialState, action: Actions) {
  switch (action.type) {
    case "selectWord":
      return {
        ...state,
        selectedWords: [...state.selectedWords, action.payload],
      };
    case "unselectWord":
      const index = state.selectedWords.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) {
        return {
          ...state,
          selectedWords: [
            ...state.selectedWords.slice(0, index),
            ...state.selectedWords.slice(index + 1),
          ],
        };
      }
      return state;
    case "unselectAllWords":
      return {
        ...state,
        selectedWords: [],
      };
    case "setWordList":
      return {
        ...state,
        wordList: action.payload,
      };
    default:
      return state;
  }
}

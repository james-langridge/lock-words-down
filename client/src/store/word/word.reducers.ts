import { types } from './word.types';
import { TermEntry } from '../../types/terms.types';
import { AnyAction } from "redux";

export interface WordsState {
  selectedWords: TermEntry[],
  wordList: TermEntry[]
}

export const initialState: WordsState = {
  selectedWords: [],
  wordList: [],
}

export default function(state: WordsState = initialState, action: AnyAction) {
  switch (action.type) {
    case types.SELECT_WORD:
      return {
        ...state,
        selectedWords: [...state.selectedWords, action.payload]
      };
    case types.UNSELECT_WORD:
      const index = state.selectedWords.findIndex(item => item._id === action.payload._id);
      if (index !== -1) {
        return {
          ...state,
          selectedWords: [
            ...state.selectedWords.slice(0, index),
            ...state.selectedWords.slice(index + 1)
          ]
        };
      }
      return state;
    case types.SELECT_ALL_WORDS:
      return {
        ...state,
        selectedWords: action.payload
      };
    case types.UNSELECT_ALL_WORDS:
      return {
        ...state,
        selectedWords: []
      };
    case types.SET_WORD_LIST:
      return {
        ...state,
        wordList: action.payload
      };
    default:
      return state;
  }
}

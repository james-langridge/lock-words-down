import { TermEntry } from '../../types/terms.types';
import { AnyAction } from "redux";

export interface WordsState {
  selectedWords: TermEntry[],
  wordList: TermEntry[]
}

const initialState: WordsState = {
  selectedWords: [],
  wordList: [],
}

export default function(state: WordsState = initialState, action: AnyAction) {
  switch (action.type) {
    case 'words/selectWord':
      return {
        ...state,
        selectedWords: [...state.selectedWords, action.payload]
      };
    case 'words/unselectWord':
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
    case 'words/selectAllWords':
      return {
        ...state,
        selectedWords: action.payload
      };
    case 'words/unselectAllWords':
      return {
        ...state,
        selectedWords: []
      };
    case 'words/setWordList':
      return {
        ...state,
        wordList: action.payload
      };
    default:
      return state;
  }
}

import { TermEntry } from '../../types/terms.types';

export const selectWord = (word: TermEntry) => {
  return {
    type: "selectWord",
    payload: word
  }
}

export const unselectWord = (word: TermEntry) => {
  return {
    type: "unselectWord",
    payload: word
  }
}

export const unselectAllWords = () => {
  return {
    type: "unselectAllWords"
  }
}

export const setWordList = (wordList: TermEntry[]) => {
  return {
    type: "setWordList",
    payload: wordList
  }
}

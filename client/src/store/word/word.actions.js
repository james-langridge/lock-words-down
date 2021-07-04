import { types } from './word.types';

export const selectWord = word => {
  return {
    type: types.SELECT_WORD,
    payload: word
  }
}

export const unselectWord = word => {
  return {
    type: types.UNSELECT_WORD,
    payload: word
  }
}

export const selectAllWords = ids => {
  return {
    type: types.SELECT_ALL_WORDS,
    payload: ids
  }
}

export const unselectAllWords = () => {
  return {
    type: types.UNSELECT_ALL_WORDS,
  }
}

export const setWordList = data => {
  return {
    type: types.SET_WORD_LIST,
    payload: data
  }
}

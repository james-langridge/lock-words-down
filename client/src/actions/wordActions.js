export const selectWord = word => {
  return {
    type: 'words/selectWord',
    payload: word
  }
}

export const unselectWord = word => {
  return {
    type: 'words/unselectWord',
    payload: word
  }
}

export const selectAllWords = ids => {
  return {
    type: 'words/selectAllWords',
    payload: ids
  }
}

export const unselectAllWords = ids => {
  return {
    type: 'words/unselectAllWords',
    payload: ids
  }
}

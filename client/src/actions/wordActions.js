export const selectWord = id => {
  return {
    type: 'words/selectWord',
    payload: id
  }
}

export const unselectWord = id => {
  return {
    type: 'words/unselectWord',
    payload: id
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

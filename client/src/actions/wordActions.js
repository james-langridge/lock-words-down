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
    type: 'words/unselectAllWords'
  }
}

export const setWordList = data => {
  return {
    type: 'words/setWordList',
    payload: data
  }
}

export const setTitle = title {
  return {
    type: 'words/setTitle',
    payload: title
  }
}

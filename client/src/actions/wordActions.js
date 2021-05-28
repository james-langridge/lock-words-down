export const selectWord = word => {
  return {
    type: 'words/selectWord',
    payload: word
  }
}

export const selectSelection = selection => {
  return {
    type: 'words/selectSelection',
    payload: selection
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

export const setGameTitle = title => {
  return {
    type: 'words/setGameTitle',
    payload: title
  }
}

export const setSelectionList = data => {
  return {
    type: 'words/setSelectionList',
    payload: data
  }
}

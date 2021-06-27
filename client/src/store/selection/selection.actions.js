export const selectSelection = selection => {
  return {
    type: 'words/selectSelection',
    payload: selection
  }
}

export const setSelectionList = data => {
  return {
    type: 'words/setSelectionList',
    payload: data
  }
}

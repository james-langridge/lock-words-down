const initialState = {
  selectedWords: [],
  wordList: [],
}

export default function(state = initialState, action) {
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

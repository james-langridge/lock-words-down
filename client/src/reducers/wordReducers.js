const initialState = {
  selectedWords: [],
  selectedSelection: {},
  wordList: [],
  selectionList: [],
  gameTitle: 'Syllables',
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'words/selectWord':
      return {
        ...state,
        selectedWords: [...state.selectedWords, action.payload]
      }
    case 'words/selectSelection':
      return {
        ...state,
        selectedSelection: action.payload
      }
    case 'words/unselectWord':
      const index = state.selectedWords.findIndex(item => item._id === action.payload._id);
      return {
        ...state,
        selectedWords: [
          ...state.selectedWords.slice(0, index),
          ...state.selectedWords.slice(index + 1)
        ]
      };
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
    case 'words/setGameTitle':
      return {
        ...state,
        gameTitle: action.payload
      };
    case 'words/setSelectionList':
      return {
        ...state,
        selectionList: action.payload
      };
    default:
      return state;
  }
}

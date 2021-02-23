const initialState = { selectedWords: [] }

export default function(state = initialState, action) {
  switch (action.type) {
    case 'words/selectWord':
      if (!state.selectedWords.some(e => e._id === action.payload._id)) {
        return {
          ...state,
          selectedWords: [...state.selectedWords, action.payload]
        }
      }
    case 'words/unselectWord':
      const index = state.selectedWords.indexOf(action.payload);
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
    default:
      return state;
  }
}

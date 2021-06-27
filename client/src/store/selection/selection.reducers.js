const initialState = {
  selectedSelection: '',
  selectionList: [],
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'selections/selectSelection':
      return {
        ...state,
        selectedSelection: action.payload
      };
    case 'selections/setSelectionList':
      return {
        ...state,
        selectionList: action.payload
      };
    default:
      return state;
  }
}

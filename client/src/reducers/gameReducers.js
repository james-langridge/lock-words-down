const initialState = {
  gameTitle: '',
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'game/setGameTitle':
      return {
        ...state,
        gameTitle: action.payload
      };
    default:
      return state;
  }
}

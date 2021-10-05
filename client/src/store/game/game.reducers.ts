import { AnyAction } from 'redux';

type GameState = {
  gameTitle: string
}

const initialState: GameState = {
  gameTitle: '',
}

export default function(state = initialState, action: AnyAction) {
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

import { AnyAction } from 'redux';

type GameState = {
  gameTitle: string
  enableScrolling: string
}

const initialState: GameState = {
  gameTitle: '',
  enableScrolling: 'false'
}

export default function(state = initialState, action: AnyAction) {
  switch (action.type) {
    case 'game/setGameTitle':
      return {
        ...state,
        gameTitle: action.payload
      };
    case 'game/toggleScrolling':
      return {
        ...state,
        enableScrolling: state.enableScrolling === 'false' ? 'true' : 'false'
      };
    default:
      return state;
  }
}

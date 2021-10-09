type GameState = {
  gameTitle: string
  enableScrolling: string
}

const initialState: GameState = {
  gameTitle: '',
  enableScrolling: 'false'
}

type SetTitleAction = {
  type: 'game/setGameTitle',
  payload: string
}

type ToggleScrollingAction = {
  type: 'game/toggleScrolling'
}

type Actions = SetTitleAction | ToggleScrollingAction;

export default function(state = initialState, action: Actions) {
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

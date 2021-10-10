import { Selection } from '../../types/terms.types';

type SelectionState = {
  selectedSelection: Selection,
  selectionList: Selection[] | null
}

const initialState = {
  selectedSelection: null,
  selectionList: null,
}

type SelectSelectionAction = {
  type: 'selections/selectSelection',
  payload: Selection
}

type UnselectSelectionAction = {
  type: 'selections/unselectSelection'
}

type SetSelectionListAction = {
  type: 'selections/setSelectionList',
  payload: Selection[]
}

type Actions = SelectSelectionAction | UnselectSelectionAction | SetSelectionListAction;

export default function(state: SelectionState = initialState, action: Actions) {
  switch (action.type) {
    case 'selections/selectSelection':
      return {
        ...state,
        selectedSelection: action.payload
      };
    case 'selections/unselectSelection':
      return {
        ...state,
        selectedSelection: null
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

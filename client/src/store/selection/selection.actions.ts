import { Selection } from '../../types/terms.types';

export const selectSelection = (selection: Selection) => {
  return {
    type: 'selections/selectSelection',
    payload: selection
  }
}

export const unselectSelection = () => {
  return {
    type: 'selections/unselectSelection'
  }
}

export const setSelectionList = (selectionList: Selection[]) => {
  return {
    type: 'selections/setSelectionList',
    payload: selectionList
  }
}

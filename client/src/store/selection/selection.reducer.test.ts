import selectionReducer from "./selection.reducers";
import { foobar, barfoo } from "../word/word.reducer.test";

const initialState = {
    selectedSelection: null,
    selectionList: null,
}

const selectionA = {
    selectionTitle: "Test Selection A",
    _id: "12345",
    selection: [foobar],
    gameTitle: "",
    created_by: "Alice",
    __V: 0
};

const selectionB = {
    selectionTitle: "Test Selection B",
    _id: "67890",
    selection: [foobar, barfoo],
    gameTitle: "",
    created_by: "Bob",
    __V: 0
}

const stateWithSelectionSelected = {
    selectedSelection: selectionA,
    selectionList: null,
}

describe('Selection Reducer', () => {

    it('Should return new state with selection selected', () => {
        const newState = selectionReducer(undefined, {
            type: 'selections/selectSelection',
            payload: selectionA
        });
        expect(newState).toEqual(stateWithSelectionSelected);
    });

    it('Should return new state with selection unselected', () => {
        const newState = selectionReducer(stateWithSelectionSelected, {
            type: 'selections/unselectSelection'
        });
        expect(newState).toEqual(initialState);
    });

    it('Should return new state with new selection list', () => {
        const newState = selectionReducer(undefined, {
            type: 'selections/setSelectionList',
            payload: [selectionA, selectionB]
        });
        expect(newState).toEqual({
            selectedSelection: null,
            selectionList: [selectionA, selectionB],
        });
    });
})

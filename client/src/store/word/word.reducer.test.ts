import wordReducer from "./word.reducers";

const initialState = {
    selectedWords: [],
    wordList: [],
}

export const foobar = {
    _id: "12345",
    term: "foobar",
    syllable: "bar",
    created_by: "Alice",
    createdAt: "yesterday",
    updatedAt: "today",
    __V: 0
};

export const barfoo = {
    _id: "67890",
    term: "barfoo",
    syllable: "foo",
    created_by: "Bob",
    createdAt: "yesterday",
    updatedAt: "today",
    __V: 0
};

const stateWithOneWordSelected = {
    selectedWords: [foobar],
    wordList: []
}

describe('Word Reducer', () => {

    it('Should return new state with word selected', () => {
        const newState = wordReducer(undefined, {
            type: 'selectWord',
            payload: foobar
        });
        expect(newState).toEqual(stateWithOneWordSelected);
    });

    it('Should return new state with word unselected', () => {
        const newState = wordReducer(stateWithOneWordSelected, {
            type: 'unselectWord',
            payload: foobar
        });
        expect(newState).toEqual(initialState);
    });

    it('Should return new state with no words selected', () => {
        const newState = wordReducer(stateWithOneWordSelected, {
            type: 'unselectAllWords'
        });
        expect(newState).toEqual(initialState);
    });

    it('Should return new state with new word list', () => {
        const newState = wordReducer(undefined, {
            type: 'setWordList',
            payload: [foobar, barfoo]
        });
        expect(newState).toEqual({
            selectedWords: [],
            wordList: [foobar, barfoo]
        });
    });
})
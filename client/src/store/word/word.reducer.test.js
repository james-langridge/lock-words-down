import wordReducer from "./word.reducers";
import { initialState } from "./word.reducers";

describe('Words Reducer', () => {

    it('Should return default state', () => {
        const newState = wordReducer(undefined, {type: '', payload: ''});
        expect(newState).toEqual(initialState);
    });
})
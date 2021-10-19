import studentReducer from "./student.reducers";

const initialState = {
    studentList: [],
    selectedStudent: null
}

const alice = {
    _id: "12345",
    name: "Alice",
    created_by: "Foo",
    createdAt: "yesterday",
    updatedAt: "today",
    __V: 0
}

const bob = {
    _id: "67890",
    name: "Bob",
    created_by: "Bar",
    createdAt: "yesterday",
    updatedAt: "today",
    __V: 0
}

const stateWithStudentSelected = {
    studentList: [],
    selectedStudent: alice
}

describe('Student Reducer', () => {

    it('Should return new state with student selected', () => {
        const newState = studentReducer(undefined, {
            type: 'selectStudent',
            payload: alice
        });
        expect(newState).toEqual(stateWithStudentSelected);
    });

    it('Should return new state with student unselected', () => {
        const newState = studentReducer(stateWithStudentSelected, {
            type: 'unselectStudent'
        });
        expect(newState).toEqual(initialState);
    });

    it('Should return new state with new student list', () => {
        const newState = studentReducer(undefined, {
            type: 'setStudentList',
            payload: [alice, bob]
        });
        expect(newState).toEqual({
            studentList: [alice, bob],
            selectedStudent: null
        });
    });
})
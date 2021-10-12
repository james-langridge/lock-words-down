import { Student } from '../../types/students.types';

type StudentsState = {
  studentList: Student[]
}

export const initialState: StudentsState = {
    studentList: []
}

type SetStudentListAction = {
  type: "setStudentList",
  payload: Student[]
}

type Actions = SetStudentListAction;


export default function(state: StudentsState = initialState, action: Actions) {
  switch (action.type) {
    case "setStudentList":
      return {
        ...state,
        studentList: action.payload
      };
    default:
      return state;
  }
}

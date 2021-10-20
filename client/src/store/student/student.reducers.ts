import { Student } from "../../types/students.types";

type StudentsState = {
  studentList: Student[] | [];
  selectedStudent: Student | null;
};

export const initialState: StudentsState = {
  studentList: [],
  selectedStudent: null,
};

type SelectStudentAction = {
  type: "selectStudent";
  payload: Student;
};

type UnselectStudentAction = {
  type: "unselectStudent";
};

type SetStudentListAction = {
  type: "setStudentList";
  payload: Student[] | [];
};

type Actions =
  | SelectStudentAction
  | UnselectStudentAction
  | SetStudentListAction;

export default function (state: StudentsState = initialState, action: Actions) {
  switch (action.type) {
    case "selectStudent":
      return {
        ...state,
        selectedStudent: action.payload,
      };
    case "unselectStudent":
      return {
        ...state,
        selectedStudent: null,
      };
    case "setStudentList":
      return {
        ...state,
        studentList: action.payload,
      };
    default:
      return state;
  }
}

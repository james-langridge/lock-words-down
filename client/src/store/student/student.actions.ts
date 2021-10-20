import { Student } from "../../types/students.types";

export const setStudentList = (studentList: Student[]) => {
  return {
    type: "setStudentList",
    payload: studentList,
  };
};

export const selectStudent = (student: Student) => {
  return {
    type: "selectStudent",
    payload: student,
  };
};

export const unselectStudent = () => {
  return {
    type: "unselectStudent",
  };
};

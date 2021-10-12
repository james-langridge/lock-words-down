import { Student } from '../../types/students.types';

export const setStudentList = (studentList: Student[]) => {
    return {
      type: "setStudentList",
      payload: studentList
    }
  }
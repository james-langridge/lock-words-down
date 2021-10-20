import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Button from "react-bootstrap/Button";
import ArrowDown from "../icons/ArrowDown";
import ArrowUp from "../icons/ArrowUp";
import { Student } from "../../types/students.types";

const SortModifiedStudents = () => {
  const [sortDirection, setsortDirection] = useState("za");
  const studentList = useAppSelector((state) => state.students.studentList);
  const dispatch = useAppDispatch();

  const compare = (a: Student, b: Student) => {
    if (a.updatedAt < b.updatedAt) {
      if (sortDirection === "za") {
        return -1;
      } else {
        return 1;
      }
    }
    if (a.updatedAt > b.updatedAt) {
      if (sortDirection === "za") {
        return 1;
      } else {
        return -1;
      }
    }

    return 0;
  };

  const handleClick = () => {
    const newStudentList = [...studentList!];
    newStudentList.sort(compare);
    dispatch({ type: "setStudentList", payload: newStudentList });
    if (sortDirection === "az") {
      setsortDirection("za");
    } else {
      setsortDirection("az");
    }
  };

  return (
    <Button variant="outline-info" onClick={() => handleClick()}>
      Modified {sortDirection === "az" ? <ArrowDown /> : <ArrowUp />}
    </Button>
  );
};

export default SortModifiedStudents;

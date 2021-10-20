import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Button from "react-bootstrap/Button";
import ArrowDown from "../icons/ArrowDown";
import ArrowUp from "../icons/ArrowUp";
import { Student } from "../../types/students.types";

const SortAlpha = () => {
  const [sortDirection, setsortDirection] = useState("za");
  const studentList = useAppSelector((state) => state.students.studentList);
  const dispatch = useAppDispatch();

  const compare = (a: Student, b: Student) => {
    if (a.name < b.name) {
      if (sortDirection === "za") {
        return -1;
      } else {
        return 1;
      }
    }
    if (a.name > b.name) {
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
    <Button onClick={() => handleClick()} variant="outline-info">
      Name {sortDirection === "az" ? <ArrowDown /> : <ArrowUp />}
    </Button>
  );
};

export default SortAlpha;

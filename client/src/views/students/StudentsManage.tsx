import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import axios from 'axios';
import { Student } from '../../types/students.types';
import { Container, Row, Alert, ButtonGroup } from 'react-bootstrap';
import StudentCard from './StudentCard';
import { Link } from "react-router-dom";
import SortAlphaStudents from '../../components/buttons/SortAlphaStudents';
import SortModifiedStudents from '../../components/buttons/SortModifiedStudents';

const StudentsManage = () => {
  const userId = useAppSelector(state => state.auth.user.id);
  const students = useAppSelector((state) => state.students.studentList);
  const selectedStudent = useAppSelector((state) => state.students.selectedStudent);
  const dispatch = useAppDispatch();
  const [errorMsg, setErrorMsg] = useState('');

  const getStudents = async () => {
    try {
      const { data } = await axios.get(`all/${userId}`);
      setErrorMsg('');
      dispatch({ type: 'setStudentList', payload: data })
    } catch (error: any) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const deleteStudent = async (student: Student) => {
    const result = window.confirm(`Delete student: ${student.name}? You cannot undo this!`)
    if (result) {
      try {
        await axios.delete<Student>(student._id);
        setErrorMsg('');
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          setErrorMsg('Error while deleting student.  Try again later.');
        }
      }
      if (selectedStudent && selectedStudent.name === student.name) {
        dispatch({ type: 'unselectStudent' })
      }
      getStudents();
    }
  };

  const handleClick = (student: Student) => {
    document.getElementById(student._id)!.classList.toggle('bg-success');
    if (!selectedStudent) {
      dispatch({ type: 'selectStudent', payload: student });
    } else if (selectedStudent) {
      if (selectedStudent.name !== student.name) {
        dispatch({ type: 'selectStudent', payload: student });
        document.getElementById(selectedStudent._id)!.classList.toggle('bg-success');
      } else if (selectedStudent.name === student.name) {
        dispatch({ type: 'unselectStudent' });
      }
    }
  }

  return (
    <Container>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      {selectedStudent && <h1>Selected student: {selectedStudent.name}</h1>}
      {students.length > 0 &&
        <ButtonGroup size="sm" className="mb-3">
          <SortAlphaStudents/>
          <SortModifiedStudents/>
        </ButtonGroup>
      }
      <Row>
        {students.length > 0 ?
          students.map((student: Student) =>
          <StudentCard
            student={student}
            functions={[handleClick, deleteStudent]}
            key={student._id}
          />) :
          <Alert variant="danger" className="my-0 mx-auto">
            <Alert.Link
              as={Link}
              to="/students/save"
            >
              Add a student!
            </Alert.Link>
          </Alert>
          }
      </Row>
    </Container>
  );
};

export default StudentsManage;

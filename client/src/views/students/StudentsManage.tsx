import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import axios from 'axios';
import { Row, Col, Table } from 'react-bootstrap';
import { Student } from '../../types/students.types';

const StudentsManage = () => {
  const userId = useAppSelector(state => state.auth.user.id);
  const students = useAppSelector((state) => state.students.studentList);
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

  return (
    <Row>
        <Col>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Student</th>
            </tr>
            </thead>
            <tbody>
            {students.map((student: Student) =>
            <tr key={student._id}>
                <td>{student.name}</td>
            </tr>
            )}
            </tbody>
        </Table>
        </Col>
    </Row>
  );
};

export default StudentsManage;

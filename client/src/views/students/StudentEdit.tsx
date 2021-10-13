import { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from '../../components/forms/StudentForm';
import { Student } from '../../types/students.types';
import { useLocation } from "react-router-dom";

const StudentEdit = (props: { history: string[]; }) => {
  const query = useQuery();
  const [errorMsg, setErrorMsg] = useState('');
  const [state, setState] = useState({
    name: ''
  });

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  useEffect(() => {
    const getStudent = async () => {
      try {
        const { data } = await axios.get<Student>(query.get('id')!);
        setErrorMsg('');
        setState({
          ...state,
          name: data.name
        });
      } catch (error: any) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getStudent();
  }, []);

  const handleOnSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const { name } = state;
      if (name.trim() !== '') {
          const data = {
            studentName: name
          }
          setErrorMsg('');
          await axios.post(query.get('id')!, data);
          props.history.push('/students/manage');
      } else {
        setErrorMsg('Please enter all the field values.');
      }
    } catch (error: any) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  return (
    <StudentForm
        state={state}
        setState={setState}
        handleOnSubmit={handleOnSubmit}
        errorMsg={errorMsg}
    />
  );
};

export default StudentEdit;

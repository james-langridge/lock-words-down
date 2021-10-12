import { useState } from 'react';
import { useAppSelector } from "../../store/hooks";
import axios from 'axios';
import StudentForm from '../../components/forms/StudentForm';

const StudentSave = (props: { history: string[]; }) => {
  const userId = useAppSelector(state => state.auth.user.id);
  const [errorMsg, setErrorMsg] = useState('');
  const [state, setState] = useState({
    name: ''
  });

  const handleOnSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const { name } = state;
      if (name.trim() !== '') {
          const data = {
            studentName: name,
            userId: userId
          }
          setErrorMsg('');
          await axios.post('save', data);
          props.history.push('/list');
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

export default StudentSave;

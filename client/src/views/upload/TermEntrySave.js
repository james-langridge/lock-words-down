import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import TermEntryForm from '../../components/forms/TermEntryForm';

const TermEntrySave = (props) => {
  const userId = useSelector(state => state.auth.user.id);
  const [errorMsg, setErrorMsg] = useState('');
  const [file, setFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false);
  const [state, setState] = useState({
    term: '',
    syllable: ''
  });

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const { term, syllable } = state;
      if (term.trim() !== '' && syllable.trim() !== '') {
        if (!file) {
          const formData = new FormData();
          formData.append('term', term);
          formData.append('syllable', syllable);
          formData.append('userId', userId);

          setErrorMsg('');
          await axios.post('term', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          props.history.push('/list');
        } else if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('term', term);
          formData.append('syllable', syllable);
          formData.append('userId', userId);

          setErrorMsg('');
          await axios.post('term', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          props.history.push('/list');
        } else {
        setErrorMsg('Please enter all the field values.');
      }
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  return (
    <TermEntryForm functions={[
        handleOnSubmit,
        state,
        setState,
        file,
        setFile,
        errorMsg,
        setErrorMsg,
        previewSrc,
        setPreviewSrc,
        isPreviewAvailable,
        setIsPreviewAvailable
      ]}
    />
  );
};

export default TermEntrySave;

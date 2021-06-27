import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import TermEntryForm from '../../components/forms/TermEntryForm';

const TermEntryEdit = (props) => {
  const query = useQuery();
  const [errorMsg, setErrorMsg] = useState('');
  const [file, setFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false);
  const [state, setState] = useState({
    term: '',
    syllable: ''
  });

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  useEffect(() => {
    const getTermEntry = async () => {
      try {
        const { data } = await axios.get('term/' + query.get('id'));
        setErrorMsg('');
        setState({
          ...state,
          term: data.term,
          syllable: data.syllable
        });
        if (data.image_url) {
          setPreviewSrc(data.image_url);
          setIsPreviewAvailable(true);
        }
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getTermEntry();
  }, []);

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const { term, syllable } = state;
      if (term.trim() !== '' && syllable.trim() !== '') {
        if (!file) {
          const formData = new FormData();
          formData.append('term', term);
          formData.append('syllable', syllable);

          setErrorMsg('');
          await axios.post('term/' + query.get('id'), formData, {
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

          setErrorMsg('');
          await axios.post('term/' + query.get('id'), formData, {
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
    <TermEntryForm functions={[handleOnSubmit, state, setState, file, setFile, errorMsg, setErrorMsg, previewSrc, setPreviewSrc, isPreviewAvailable, setIsPreviewAvailable]} />
  );
};

export default TermEntryEdit;

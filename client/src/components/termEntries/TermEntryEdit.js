import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { Form, Row, Col, Button } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';

const TermEntryEdit = (props) => {
  const [file, setFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState('');
  const [image, setImage] = useState(null);
  const [state, setState] = useState({
    term: '',
    syllable: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(true);
  const dropRef = useRef();
  const query = useQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    const getTermEntry = async () => {
      try {
        const { data } = await axios.get('term/getTerm/' + query.get('id'));
        setErrorMsg('');
        setState({
          ...state,
          term: data.term,
          syllable: data.syllable
        });
        setPreviewSrc(data.image_url);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getTermEntry();
  }, []);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.style.border = '2px dashed #e9ebeb';
  };

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  };

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
          await axios.post('term/update/' + query.get('id'), formData, {
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
          await axios.post('term/update/' + query.get('id'), formData, {
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
    <React.Fragment>
      <Form className="form-upload" onSubmit={handleOnSubmit}>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <Row>
          <Col>
            <Form.Group controlId="term">
              <Form.Label>Term</Form.Label>
              <Form.Control
                type="text"
                name="term"
                value={state.term || ''}
                placeholder="Enter term"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="syllable">
              <Form.Label>Syllable</Form.Label>
              <Form.Control
                type="text"
                name="syllable"
                value={state.syllable || ''}
                placeholder="Enter syllable"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="upload-section">
          <Dropzone
            onDrop={onDrop}
            onDragEnter={() => updateBorder('over')}
            onDragLeave={() => updateBorder('leave')}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                <input {...getInputProps()} />
                <p className="text-center">To change image, drag and drop a file OR click here to select a file</p>
                {file && (
                  <div>
                    <strong>Selected file:</strong> {file.name}
                  </div>
                )}
              </div>
            )}
          </Dropzone>
          {previewSrc ? (
            isPreviewAvailable ? (
              <div className="image-preview">
                <img className="preview-image" src={previewSrc} alt="Preview" />
              </div>
            ) : (
              <div className="preview-message">
                <p>No preview available for this file</p>
              </div>
            )
          ) : (
            <div className="preview-message">
              <p>Image preview will be shown here after selection</p>
            </div>
          )}
        </div>
        <Button variant="primary" type="submit">Submit</Button>
        <Button className="mx-2" variant="secondary" as={Link} to="/list">Cancel</Button>
      </Form>
    </React.Fragment>
  );
};

export default TermEntryEdit;

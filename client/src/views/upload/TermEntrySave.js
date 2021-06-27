import React, { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { Button, Col, Form, Row } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from 'react-redux';

const TermEntrySave = (props) => {
  const userId = useSelector(state => state.auth.user.id);
  const [file, setFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState('');
  const [state, setState] = useState({
    term: '',
    syllable: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false);
  const dropRef = useRef();

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
    <React.Fragment>
      <Form className="form-upload" onSubmit={handleOnSubmit}>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <Row>
          <Col>
            <Form.Group controlId="term">
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
        <Row>
          <Col>
            <Form.Group controlId="userId">
              <Form.Control
                type="hidden"
                name="userId"
                value={userId}
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
                <p>Drag and drop a file OR click here to select a file</p>
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

export default TermEntrySave;

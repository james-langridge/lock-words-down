import React, { useState } from 'react';
import axios from 'axios';
import { Col, Form, Row } from 'react-bootstrap';
import Submit from '../buttons/Submit';
import Cancel from '../buttons/Cancel';
import Upload from './Upload';

const TermEntryForm = (props) => {
  const [
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
  ] = props.functions;

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  return (
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
      <Upload functions={[
        file,
        setFile,
        previewSrc,
        setPreviewSrc,
        isPreviewAvailable,
        setIsPreviewAvailable
      ]} />
      <Submit />
      <Cancel />
    </Form>
  );
};

export default TermEntryForm;

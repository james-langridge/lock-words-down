import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import download from 'downloadjs';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import WordCard from './WordCard';
import styled from 'styled-components';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

const ImageContainer = styled.div`
  height: 220px;
  width: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const FilesList = () => {
  const userId = useSelector(state => state.auth.user.id);
  const title = useSelector(state => state.words.title);
  const selectedWords = useSelector(state => state.words.selectedWords);
  const wordList = useSelector(state => state.words.wordList);
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();

  const getFilesList = async () => {
    try {
      const { data } = await axios.get(`file/getAllFiles/${userId}`);
      setErrorMsg('');
      setFilesList(data);
      dispatch({ type: 'words/setWordList', payload: data })
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  useEffect(() => {
    getFilesList();
  }, []);

  useEffect(() => {
    setFilesList(wordList);
  }, [wordList]);

  const handleDelete = async (id) => {
    const result = window.confirm('Delete this word? You cannot undo this.')
    if (result) {
      try {
        await axios.delete(`file/delete/${id}`);
        setErrorMsg('');
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrorMsg('Error while deleting file.  Try again later.');
        }
      }
      getFilesList();
    }
  };

  const handleClick = (word) => {
    document.getElementById(word._id).classList.toggle('bg-success');
    if (!selectedWords.find(e => e.word === word.word)) {
      dispatch({ type: 'words/selectWord', payload: word })
    } else {
      dispatch({ type: 'words/unselectWord', payload: word })
    }
  }

  const changeTitle = e => {
    if (e.target.value === '') {
      dispatch({ type: 'words/setTitle', payload: 'Syllables' });
    } else {
      dispatch({ type: 'words/setTitle', payload: e.target.value });
    }
  };

  return (
    <Container>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Change title:</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          placeholder={title}
          onChange={changeTitle}
        />
      </InputGroup>
      <Row>
        {filesList.length > 0 ?
          filesList.map((word) =>
          <Col sm={6} md={4} lg={3} key={word._id}>
            <Card className="mb-4 box-shadow" id={word._id} style={{ width: 222 }}>
            <ImageContainer>
              <Image src={word.image_url} onClick={() => handleClick(word)} />
            </ImageContainer>
              <Card.Body>
                <Card.Title>{word.word}</Card.Title>
                <Card.Text>{word.syllable}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <ButtonGroup size="sm">
                    <Button variant="outline-secondary" onClick={() => handleClick(word)}>Select</Button>
                    <Button variant="outline-secondary" as={Link} to={'/edit?id=' + word._id}>Edit</Button>
                    <Button variant="outline-secondary" onClick={() => handleDelete(word._id)}>Delete</Button>
                  </ButtonGroup>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ) : <Alert variant="primary"><Alert.Link as={Link} to="/upload">Add some words!</Alert.Link></Alert>
        }
      </Row>
    </Container>
  );
};

export default FilesList;

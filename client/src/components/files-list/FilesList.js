import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Alert, Button, ButtonGroup, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import styled from 'styled-components';
import SortAlpha from '../buttons/SortAlpha';
import SortModified from '../buttons/SortModified';

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
  const gameTitle = useSelector(state => state.game.gameTitle);
  const selectedWords = useSelector(state => state.words.selectedWords);
  const wordList = useSelector(state => state.words.wordList);
  const selectedSelection = useSelector(state => state.selections.selectedSelection);
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();

  const getWordList = async () => {
    try {
      const { data } = await axios.get(`file/getAllFiles/${userId}`);
      setErrorMsg('');
      dispatch({ type: 'words/setWordList', payload: data })
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  const getSelectionList = async () => {
    try {
      const { data } = await axios.get(`file/getAllSelections/${userId}`);
      setErrorMsg('');
      dispatch({ type: 'selections/setSelectionList', payload: data });
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  useEffect(() => {
    getWordList();
    getSelectionList();
  }, []);

  const deleteWord = async (word) => {
    const result = window.confirm(`Delete word: ${word.word}? You cannot undo this!`)
    if (result) {
      try {
        await axios.delete(`file/delete/${word._id}`);
        setErrorMsg('');
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrorMsg('Error while deleting file.  Try again later.');
        }
      }
      if (selectedWords.find(e => e.word === word.word)) {
        dispatch({ type: 'words/unselectWord', payload: word })
      }
      getWordList();
    }
  };

  const deleteSelection = async (selectedSelection) => {
    const result = window.confirm(`Delete selection: ${selectedSelection.title || selectedSelection.selectionTitle}? You cannot undo this!`)
    if (result) {
      try {
        await axios.delete(`file/deleteSelection/${selectedSelection._id}`);
        setErrorMsg('');
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrorMsg('Error while deleting selection.  Try again later.');
        }
      }
      dispatch({ type: 'selections/selectSelection', payload: '' });
      dispatch({ type: 'game/setGameTitle', payload: '' });
      getSelectionList();
    }
  };

  const handleClick = (word) => {
    if (selectedSelection) {
      dispatch({ type: 'selections/selectSelection', payload: '' });
    }
    document.getElementById(word._id).classList.toggle('bg-success');
    if (!selectedWords.find(e => e.word === word.word)) {
      dispatch({ type: 'words/selectWord', payload: word })
    } else {
      dispatch({ type: 'words/unselectWord', payload: word })
    }
  }

  const changeGameTitle = e => {
    dispatch({ type: 'game/setGameTitle', payload: e.target.value });
  };

  return (
    <Container>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text>Game title:</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          placeholder="e.g. Syllables..."
          onChange={changeGameTitle}
          value={gameTitle || ''}
        />
      </InputGroup>
      {selectedSelection &&
        <h1 className="align-bottom">{selectedSelection.selectionTitle || selectedSelection.title}</h1>
      }
      <ButtonGroup size="sm" className="mb-3">
        <SortAlpha/>
        <SortModified/>
        {Object.keys(selectedSelection).length !== 0 &&
          <Button
            variant="outline-danger"
            onClick={() => deleteSelection(selectedSelection)}
          >
            Delete selection
          </Button>
        }
      </ButtonGroup>
      <Row>
          {wordList.length > 0 ?
          wordList.map((word) =>
          <Col sm={6} md={4} lg={3} key={word._id}>
            <Card className="mb-4 box-shadow" id={word._id} style={{ width: 222 }}>
            {word.image_url &&
            <ImageContainer>
              <Image src={word.image_url} onClick={() => handleClick(word)} />
            </ImageContainer>}
              <Card.Body>
                <Card.Title>{word.word}</Card.Title>
                <Card.Text>{word.syllable}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <ButtonGroup size="sm">
                    <Button variant="outline-secondary" onClick={() => handleClick(word)}>Select</Button>
                    <Button variant="outline-secondary" as={Link} to={'/edit?id=' + word._id}>Edit</Button>
                    <Button variant="outline-secondary" onClick={() => deleteWord(word)}>Delete</Button>
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

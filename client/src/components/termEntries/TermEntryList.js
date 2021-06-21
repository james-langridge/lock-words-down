import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import axios from 'axios';
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row
} from 'react-bootstrap';
import styled from 'styled-components';
import SortAlpha from '../buttons/SortAlpha';
import SortModified from '../buttons/SortModified';
import TermEntry from './TermEntry';

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

const TermEntryList = () => {
  const userId = useSelector(state => state.auth.user.id);
  const gameTitle = useSelector(state => state.game.gameTitle);
  const selectedWords = useSelector(state => state.words.selectedWords);
  const termEntries = useSelector(state => state.words.wordList);
  const selectedSelection = useSelector(state => state.selections.selectedSelection);
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();

  const getTermEntries = async () => {
    try {
      const { data } = await axios.get(`term/getAllTerms/${userId}`);
      setErrorMsg('');
      dispatch({ type: 'words/setWordList', payload: data })
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  const getSelections = async () => {
    try {
      const { data } = await axios.get(`selection/getAllSelections/${userId}`);
      setErrorMsg('');
      dispatch({ type: 'selections/setSelectionList', payload: data });
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  useEffect(() => {
    getTermEntries();
    getSelections();
  }, []);

  const deleteTermEntry = async (termEntry) => {
    const result = window.confirm(`Delete word: ${termEntry.term}? You cannot undo this!`)
    if (result) {
      try {
        await axios.delete(`term/delete/${termEntry._id}`);
        setErrorMsg('');
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrorMsg('Error while deleting term.  Try again later.');
        }
      }
      if (selectedWords.find(e => e.term === termEntry.term)) {
        dispatch({ type: 'words/unselectWord', payload: termEntry })
      }
      getTermEntries();
    }
  };

  const deleteSelection = async (selectedSelection) => {
    const result = window.confirm(`Delete selection: ${selectedSelection.selectionTitle}? You cannot undo this!`)
    if (result) {
      try {
        await axios.delete(`selection/deleteSelection/${selectedSelection._id}`);
        setErrorMsg('');
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrorMsg('Error while deleting selection.  Try again later.');
        }
      }
      dispatch({ type: 'selections/selectSelection', payload: '' });
      dispatch({ type: 'game/setGameTitle', payload: '' });
      getSelections();
    }
  };

  const handleClick = (word) => {
    if (selectedSelection) {
      dispatch({ type: 'selections/selectSelection', payload: '' });
    }
    document.getElementById(word._id).classList.toggle('bg-success');
    if (!selectedWords.find(e => e.term === word.term)) {
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
        <h1>
          {selectedSelection.selectionTitle}
        </h1>
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
          {termEntries.length > 0 ?
            termEntries.map((termEntry) =>
            <TermEntry
              termEntry={termEntry}
              functions={[handleClick, deleteTermEntry]}
              key={termEntry._id}
            />) :
            <Alert variant="primary">
              <Alert.Link
                as={Link}
                to="/upload"
              >
                Add some terms!
              </Alert.Link>
            </Alert>
        }
      </Row>
    </Container>
  );
};

export default TermEntryList;

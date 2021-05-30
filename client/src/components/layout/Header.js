import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../../actions/authActions";
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Nav,
  Navbar,
  NavDropdown
} from 'react-bootstrap';
import axios from 'axios';

const Header = () => {
  const selectedWords = useSelector(state => state.words.selectedWords);
  const wordList = useSelector(state => state.words.wordList);
  const selectionList = useSelector(state => state.selections.selectionList);
  const selectedSelection = useSelector(state => state.selections.selectedSelection);
  const dispatch = useDispatch();
  const location = useLocation();

  const logOut = () => {
    dispatch(logoutUser());
    window.location.href = "./login";
  }

  const selectSelection = (selection) => {
    dispatch({ type: 'words/unselectAllWords' });
    document.querySelectorAll('.card').forEach(el => {
      el.classList.remove('bg-success')
    });

    const selectedWordIds = [];
    selection.selection.forEach(word => {
      dispatch({ type: 'words/selectWord', payload: word });
      document.getElementById(word._id).classList.add('bg-success');
      selectedWordIds.push(word._id);
    });

    const sortedWordList = wordList.reduce((acc, word) => {
      if (selectedWordIds.includes(word._id)) {
        return [word, ...acc];
      }
      return [...acc, word];
    }, []);

    dispatch({ type: 'words/setWordList', payload: sortedWordList })
    dispatch({ type: 'selections/selectSelection', payload: selection });
    dispatch({ type: 'game/setGameTitle', payload: selection.gameTitle });
  }

  const selectAll = () => {
    if (selectedSelection) {
      dispatch({ type: 'selections/selectSelection', payload: '' });
    }
    document.querySelectorAll('.card').forEach(el => {
      el.classList.add('bg-success')
    });
    wordList.forEach(word => {
      if (!selectedWords.some(e => e.word === word.word)) {
        dispatch({ type: 'words/selectWord', payload: word });
      }
    });
  }

  const unselectAll = () => {
    if (selectedSelection) {
      dispatch({ type: 'selections/selectSelection', payload: '' });
    }
    dispatch({ type: 'words/unselectAllWords' });
    document.querySelectorAll('.card').forEach(el => {
      el.classList.remove('bg-success')
    });
  }

  return (
    <Navbar variant="dark" fixed="top" bg="dark" expand="md">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mb-2 mb-md-0 mr-auto">
            <DropdownButton
              id="dropdown-basic-button"
              variant="success"
              title="Play"
              disabled={
                selectedWords.length && location.pathname === '/list' ?
                false : true
              }
              className="mr-2"
            >
              <Dropdown.Item as={Link} to="/game">
                Match
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/alpha-sort">
                Sort
              </Dropdown.Item>
            </DropdownButton>
            <Button
              variant="primary"
              as={Link}
              to="/upload"
              className="mr-2"
            >
              Add word
            </Button>
            <Button
              variant="primary"
              as={Link}
              to="/selection"
              disabled={
                selectedWords.length && location.pathname === '/list' ?
                false : true
              }
              className="mr-2"
            >
              Save selection
            </Button>
            <DropdownButton
              id="dropdown-basic-button"
              title="Select"
              disabled={
                selectionList.length && location.pathname === '/list' ?
                false : true
              }
            >
              <Dropdown.Item onClick={() => selectAll()}>
                Select all
              </Dropdown.Item>
              <Dropdown.Item onClick={() => unselectAll()}>
                Select none
              </Dropdown.Item>
              <Dropdown.Divider />
              {selectionList.map(selection =>
                <Dropdown.Item
                  onClick={() => selectSelection(selection)}
                  key={selection._id}
                >
                    {selection.title || selection.selectionTitle}
                </Dropdown.Item>
              )}
            </DropdownButton>
          </Nav>
          <Nav>
            <Button variant="danger" onClick={() => logOut()}>Log out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

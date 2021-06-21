import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../../actions/authActions";
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Nav,
  Navbar,
  NavDropdown
} from 'react-bootstrap';
import axios from 'axios';
import { Typeahead } from 'react-bootstrap-typeahead';

const Header = () => {
  const selectedWords = useSelector(state => state.words.selectedWords);
  const wordList = useSelector(state => state.words.wordList);
  const selectionList = useSelector(state => state.selections.selectionList);
  const selectedSelection = useSelector(state => state.selections.selectedSelection);
  const dispatch = useDispatch();
  const location = useLocation();
  const [options, setOptions] = useState([]);
  const [singleSelections, setSingleSelections] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const compare = (a, b) => {
    if (a.label < b.label) {
      return -1;
    }

    if (a.label > b.label) {
      return 1;
    }

    return 0;
  }

  const updateOptions = () => {
    const options = wordList.map(termEntry => (
      {
        id: termEntry._id,
        label: termEntry.term
      }
    ));
    options.sort(compare);
    setOptions(options);
  }

  useEffect(() => {
    updateOptions();
  }, [wordList]);

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
      if (!selectedWords.some(e => e.term === word.term)) {
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

  const getTermEntry = async (id) => {
    try {
      const { data } = await axios.get('term/getTerm/' + id);
      setErrorMsg('');
      return data;
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  const handleClick = async () => {
    const selectedWord = await getTermEntry(singleSelections[0].id);
    if (selectedSelection) {
      dispatch({ type: 'selections/selectSelection', payload: '' });
    }
    document.getElementById(selectedWord._id).classList.toggle('bg-success');
    const sortedWordList = wordList.reduce((acc, word) => {
      if (selectedWord._id === word._id) {
        return [word, ...acc];
      }
      return [...acc, word];
    }, []);
    dispatch({ type: 'words/setWordList', payload: sortedWordList })
    if (!selectedWords.find(e => e.term === selectedWord.term)) {
      dispatch({ type: 'words/selectWord', payload: selectedWord })
    } else {
      dispatch({ type: 'words/unselectWord', payload: selectedWord })
    }
  }

  return (
    <Navbar variant="dark" fixed="top" bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Navbar.Brand as={Link} to="/list">Lock Words Down</Navbar.Brand>
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
              className={selectedWords.length ? "mr-2" : "mr-2 disabled"}
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
              className="mr-2"
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
                    {selection.selectionTitle}
                </Dropdown.Item>
              )}
            </DropdownButton>
            <Form.Group style={{ marginBottom: 'unset' }}>
              <InputGroup>
                <Typeahead
                  id="basic-typeahead-single"
                  onChange={setSingleSelections}
                  options={options}
                  placeholder="Choose a term..."
                  selected={singleSelections}
                />
                <InputGroup.Append>
                  <Button
                    onClick={handleClick}
                    variant="outline-secondary"
                  >
                    Select
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
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

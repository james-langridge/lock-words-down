import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "../../store/authentication/authentication.actions";
import {
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Nav,
  Navbar
} from 'react-bootstrap';
import axios from 'axios';
import { Typeahead } from 'react-bootstrap-typeahead';
import { TermEntry, Selection, Option } from '../../types/terms.types';

const Header = () => {
  const selectedWords = useAppSelector(state => state.words.selectedWords);
  const wordList = useAppSelector(state => state.words.wordList);
  const selectionList = useAppSelector(state => state.selections.selectionList);
  const selectedSelection = useAppSelector(state => state.selections.selectedSelection);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [options, setOptions] = useState<Option[]>([]);
  const [singleSelections, setSingleSelections] = useState<Option[]>([]);
  const [, setErrorMsg] = useState('');

  const compare = (a: Option, b: Option) => {
    if (a.label < b.label) {
      return -1;
    }

    if (a.label > b.label) {
      return 1;
    }

    return 0;
  }

  const updateOptions = () => {
    const options = wordList.map((termEntry: TermEntry) => (
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

  const clearSelectedSelection = () => {
    if (selectedSelection) {
      dispatch({ type: 'selections/unselectSelection' });
    }
  }

  const unselectAll = () => {
    clearSelectedSelection();
    dispatch({ type: 'unselectAllWords' });
    document.querySelectorAll('.card').forEach(el => {
      el.classList.remove('bg-success')
    });
  }

  const selectSelection = (selection: Selection) => {
    unselectAll();
    
    const selectedWordIds: string[] = [];
    selection.selection.forEach(word => {
      dispatch({ type: 'selectWord', payload: word });
      document.getElementById(word._id)!.classList.add('bg-success');
      console.log(document.getElementById(word._id));
      selectedWordIds.push(word._id);
    });

    const sortedWordList = wordList.reduce((acc: TermEntry[], word: TermEntry) => {
      if (selectedWordIds.includes(word._id)) {
        return [word, ...acc];
      }
      return [...acc, word];
    }, []);

    dispatch({ type: 'setWordList', payload: sortedWordList })
    dispatch({ type: 'selections/selectSelection', payload: selection });
    dispatch({ type: 'game/setGameTitle', payload: selection.gameTitle });

    selection.selection.forEach(word => {
      console.log(document.getElementById(word._id));
    });
  }

  const selectAll = () => {
    clearSelectedSelection();
    document.querySelectorAll('.card').forEach(el => {
      el.classList.add('bg-success')
    });
    wordList.forEach((word: TermEntry) => {
      if (!selectedWords.some((e: TermEntry) => e.term === word.term)) {
        dispatch({ type: 'selectWord', payload: word });
      }
    });
  }

  const getTermEntry = async (id: string) => {  
    try {
      const { data } = await axios.get<TermEntry>('term/' + id);
      setErrorMsg('');

      return data;
    } catch (error: any) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  const handleClick = async () => {
    const selectedWord = await getTermEntry(singleSelections[0].id);
    
    clearSelectedSelection();
    document.getElementById(selectedWord!._id)!.classList.toggle('bg-success');
    const sortedWordList = wordList.reduce((acc: TermEntry[], word: TermEntry) => {
      if (selectedWord!._id === word._id) {
        return [word, ...acc];
      }
      return [...acc, word];
    }, []);
    dispatch({ type: 'setWordList', payload: sortedWordList })
    if (!selectedWords.find((e: TermEntry) => e.term === selectedWord!.term)) {
      dispatch({ type: 'selectWord', payload: selectedWord })
    } else {
      dispatch({ type: 'unselectWord', payload: selectedWord })
    }
  }

  return (
    <Navbar className="headerComponent" variant="dark" fixed="top" bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Navbar.Brand as={Link} to="/list">Lock Words Down</Navbar.Brand>
          <Nav className="me-auto mb-2 mb-md-0 mr-auto">
            <DropdownButton
              variant="success"
              title="Play"
              disabled={!(selectedWords.length > 1 && location.pathname === '/list')}
              className="mr-2"
            >
              <Dropdown.Item as={Link} to="/game">
                Match
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/game/alpha-sort">
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
              title="Select"
              disabled={!(selectionList && location.pathname === '/list')}
              className="mr-2"
            >
              <Dropdown.Item onClick={() => selectAll()}>
                Select all
              </Dropdown.Item>
              <Dropdown.Item onClick={() => unselectAll()}>
                Select none
              </Dropdown.Item>
              <Dropdown.Divider />
              {selectionList && selectionList.map((selection: Selection) =>
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

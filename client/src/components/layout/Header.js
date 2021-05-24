import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../../actions/authActions";
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios';

const Header = () => {
  const userId = useSelector(state => state.auth.user.id);
  const selectedWords = useSelector(state => state.words.selectedWords);
  const wordList = useSelector(state => state.words.wordList);
  const [selections, setSelections] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();

  const logOut = () => {
    dispatch(logoutUser());
    window.location.href = "./login";
  }

  useEffect(() => {
  const getSelections = async () => {
    try {
      const { data } = await axios.get(`file/getAllSelections/${userId}`);
      setErrorMsg('');
      setSelections(data);
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  getSelections();
  }, [location]);

  const selectSelection = (selection) => {
    dispatch({ type: 'words/unselectAllWords' });
    document.querySelectorAll('.card').forEach(el => el.classList.remove('bg-success'));

    selection.forEach(word => {
      dispatch({ type: 'words/selectWord', payload: word });
      document.getElementById(word._id).classList.add('bg-success');
    });
  }

  const selectAll = () => {
    document.querySelectorAll('.card').forEach(el => el.classList.add('bg-success'));
    wordList.forEach(word => {
      if (!selectedWords.some(e => e.word === word.word)) {
        dispatch({ type: 'words/selectWord', payload: word });
      }
    });
  }

  const unselectAll = () => {
    dispatch({ type: 'words/unselectAllWords' });
    document.querySelectorAll('.card').forEach(el => el.classList.remove('bg-success'));
  }

  return (
    <Navbar variant="dark" fixed="top" bg="dark" expand="md">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mb-2 mb-md-0">
            <Button variant="success" as={Link} to="/game" className={selectedWords.length ? "mx-2" : "mx-2 disabled"}>Play game</Button>
            <Button variant="success" as={Link} to="/alpha-sort" className={selectedWords.length ? "mx-2" : "mx-2 disabled"}>Play Alpha Sort</Button>
            <Button variant="primary" as={Link} to="/upload">Add word</Button>
            <Button variant="primary" as={Link} to="/selection" className={selectedWords.length ? "mx-2" : "mx-2 disabled"}>Save selection</Button>
            <DropdownButton id="dropdown-basic-button" title="Select" disabled={selections.length && location.pathname === '/list' ? false : true} className="mr-2">
              <Dropdown.Item onClick={() => selectAll()}>Select all</Dropdown.Item>
              <Dropdown.Item onClick={() => unselectAll()}>Select none</Dropdown.Item>
              <Dropdown.Divider />
              {selections.map(selection =>
                <Dropdown.Item onClick={() => selectSelection(selection.selection)} key={selection._id}>{selection.title}</Dropdown.Item>
              )}
            </DropdownButton>
            <Button variant="danger" onClick={() => logOut()}>Log out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

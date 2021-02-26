import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../../actions/authActions";
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';

const Header = () => {
  const selectedWords = useSelector(state => state.words.selectedWords);
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logoutUser());
    window.location.href = "./login";
  }

  return (
    <Navbar variant="dark" fixed="top" bg="dark" expand="md">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mb-2 mb-md-0">
            <Button variant="primary" as={Link} to="/upload">Add word</Button>
            <Button className={selectedWords.length ? "mx-2" : "mx-2 disabled"} variant="success" as={Link} to="/game">Play game</Button>
            <Button variant="danger" onClick={() => logOut()}>Log out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

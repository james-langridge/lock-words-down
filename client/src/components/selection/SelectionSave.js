import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const SelectionSave = () => {
  const selectedWords = useSelector(state => state.words.selectedWords);
  const history = useHistory();
  const userId = useSelector(state => state.auth.user.id);
  const [errorMsg, setErrorMsg] = useState('');
  const [titles, setTitles] = useState({
    selectionTitle: '',
    gameTitle: '',
  });
  const selection = selectedWords.map(word => {
    const obj = {};
    obj.word = word.word;
    obj.syllable = word.syllable;
    obj.image_url = word.image_url;
    obj.id = word._id;

    return obj;
  });

  const handleInputChange = (event) => {
    // setTitle(event.target.value);
    setTitles({
      ...titles,
      [event.target.name]: event.target.value,
    });
    console.log('titles:', titles);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      if (titles.selectionTitle.trim() !== '' && titles.gameTitle.trim() !== '') {
        const data = {
          selectionTitle: titles.selectionTitle,
          gameTitle: titles.gameTitle,
          selectedWords: selectedWords,
          userId: userId
        }
        setErrorMsg('');

        await axios.post('file/selection', data);
        history.push('/list');
      } else {
        setErrorMsg('Please enter all the field values.');
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Form className="form-upload" onSubmit={handleOnSubmit}>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <Row>
          <Col>
            <Form.Group>
              <Form.Label srOnly>Selection name</Form.Label>
              <Form.Control
                type="text"
                name="selectionTitle"
                value={titles.selectionTitle || ''}
                placeholder="What is this selection called for your reference?"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label srOnly>Game name</Form.Label>
              <Form.Control
                type="text"
                name="gameTitle"
                value={titles.gameTitle || ''}
                placeholder="What is the name of the game you will play with it?"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Word</th>
                  <th>Syllable</th>
                </tr>
              </thead>
              <tbody>
              {selectedWords.map((word) =>
                <tr key={word._id}>
                  <td>{word.word}</td>
                  <td>{word.syllable}</td>
                </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Control
                type="hidden"
                name="selection"
                value={selection}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">Submit</Button>
        <Button className="mx-2" variant="secondary" as={Link} to="/list">Cancel</Button>
      </Form>
    </React.Fragment>
  );
};

export default SelectionSave;

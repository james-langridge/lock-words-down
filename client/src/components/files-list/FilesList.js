import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../../actions/authActions";
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

const FilesList = (props) => {
  const userId = useSelector(state => state.auth.user.id);
  const selectedWords = useSelector(state => state.words.selectedWords);
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`file/getAllFiles/${userId}`);
        setErrorMsg('');
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);

  const handleDelete = async (id) => {
    const result = window.confirm('Delete this word? You cannot undo this.')
    if (result) {
      try {
        await axios.delete(`file/delete/${id}`);
        setErrorMsg('');
        try {
          const { data } = await axios.get('file/getAllFiles');
          setErrorMsg('');
          setFilesList(data);
        } catch (error) {
          error.response && setErrorMsg(error.response.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrorMsg('Error while deleting file.  Try again later.');
        }
      }
    }
  };

  const handleClick = (word) => {
    const el = document.getElementById(word._id);
    el.classList.toggle('selected');
    el.classList.toggle('bg-success');
    const isSelected = el.classList.contains('selected')
    if (isSelected) {
      dispatch({ type: 'words/selectWord', payload: word })
    } else if (!isSelected) {
      dispatch({ type: 'words/unselectWord', payload: word })
    }
  }

  // https://scotch.io/starters/react/handling-lists-in-react-jsx#toc-looping-over-an-object-instead-of-an-array

  const logOut = () => {
    dispatch(logoutUser());
    window.location.href = "./login";
  }

  const saveSelection = () => {
    console.log('selectedWords', selectedWords);
  }

  const compareAlpha = (a,b) => {
    if ( a.word < b.word ) {
      return -1;
    }
    if ( a.word > b.word ){
      return 1;
    }

    return 0;
  }

  const compareCreated = (a,b) => {
    if ( a.createdAt > b.createdAt ) {
      return -1;
    }
    if ( a.createdAt < b.createdAt ){
      return 1;
    }

    return 0;
  }

  const sortAlpha = () => {
    const newFileList = [...filesList];
    newFileList.sort(compareAlpha);
    setFilesList(newFileList);
  }

  const sortCreated = () => {
    const newFileList = [...filesList];
    newFileList.sort(compareCreated);
    setFilesList(newFileList);
  }

return (
  <Container>
    <ButtonGroup size="sm" className="mb-3">
      <Button variant="outline-primary" onClick={() => sortAlpha()}>Sort alphabetically</Button>
      <Button variant="outline-primary" onClick={() => sortCreated()}>Sort by date created</Button>
    </ButtonGroup>
    <Row>
      {filesList.length > 0 ?
        filesList.map((word) =>
        <Col md={6} lg={4} key={word._id}>
          <Card className="mb-4 box-shadow" id={word._id} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={word.image_url} onClick={() => handleClick(word)} />
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

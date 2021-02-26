import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import download from 'downloadjs';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
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

return (
  <div>
    <Button variant="primary" as={Link} to="/upload">Add word</Button>
    <Button className={`mx-2 ${selectedWords.length ? "" : "disabled"}`} variant="success" as={Link} to="/game">Play game</Button>
    <Button variant="danger" onClick={() => logOut()}>Log out</Button>
    <div className="photos-list">
    {filesList.length > 0 &&
      filesList.map((word) =>
      <Card className="photo" key={word._id} id={word._id} style={{ width: '18rem' }}>
        <Card.Img variant="top" src={word.image_url} onClick={() => handleClick(word)} />
        <Card.Body>
          <Card.Title>{word.word}</Card.Title>
          <Card.Text>{word.syllable}</Card.Text>
          <Card.Link as={Link} to={'/edit?id=' + word._id}>Edit</Card.Link>
          <Card.Link href="#" onClick={() => handleDelete(word._id)}>Delete</Card.Link>
        </Card.Body>
      </Card>
      )
    }
    </div>
  </div>
  );
};

export default FilesList;

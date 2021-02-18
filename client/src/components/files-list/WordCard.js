import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";
import axios from 'axios';

const WordCard = (key, word, handleDelete) => {

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{word.word}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{word.syllable}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link as={Link} to="/edit">Edit</Card.Link>
        <Card.Link href="#" onClick={() => handleDelete(word._id)}>Delete</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default WordCard;

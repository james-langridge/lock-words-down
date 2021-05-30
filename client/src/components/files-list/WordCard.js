import React from 'react';
import { Button, ButtonGroup, Card, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import styled from 'styled-components';

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

const WordCard = (props) => {
  const [handleClick, deleteWord] = props.functions;
  const word = props.word;

  return (
    <Col sm={6} md={4} lg={3}>
      <Card className="mb-4 box-shadow" id={word._id} style={{ width: 222 }}>
      {word.image_url &&
      <ImageContainer>
        <Image src={word.image_url} onClick={() => handleClick(word)} />
      </ImageContainer>}
        <Card.Body>
          <Card.Title>{word.word}</Card.Title>
          <Card.Text>{word.syllable}</Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <ButtonGroup size="sm">
              <Button variant="outline-secondary" onClick={() => handleClick(word)}>Select</Button>
              <Button variant="outline-secondary" as={Link} to={'/edit?id=' + word._id}>Edit</Button>
              <Button variant="outline-secondary" onClick={() => deleteWord(word)}>Delete</Button>
            </ButtonGroup>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default WordCard;

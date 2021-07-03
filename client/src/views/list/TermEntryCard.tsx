import React from 'react';
import { Button, ButtonGroup, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TermEntry } from '../../types/terms.types';

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

type TermEntryProps = {
  termEntry: TermEntry;
  functions: ((termEntry: TermEntry) => void)[];
}

const TermEntryCard: React.FC<TermEntryProps> = ({ termEntry, functions }) => {
  const [handleClick, deleteTermEntry] = functions;

  return (
    <Col sm={6} md={4} lg={3}>
      <Card className="mb-4 box-shadow" id={termEntry._id} style={{ width: 222 }}>
      {termEntry.image_url &&
      <ImageContainer>
        <Image src={termEntry.image_url} onClick={() => handleClick(termEntry)} />
      </ImageContainer>}
        <Card.Body>
          <Card.Title>{termEntry.term}</Card.Title>
          <Card.Text>{termEntry.syllable}</Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <ButtonGroup size="sm">
              <Button variant="outline-secondary" onClick={() => handleClick(termEntry)}>Select</Button>
              <Button variant="outline-secondary" as={Link} to={'/edit?id=' + termEntry._id}>Edit</Button>
              <Button variant="outline-secondary" onClick={() => deleteTermEntry(termEntry)}>Delete</Button>
            </ButtonGroup>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TermEntryCard;

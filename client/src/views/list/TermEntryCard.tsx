import React from 'react';
import { Col, Button, ButtonGroup, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TermEntry } from '../../types/terms.types';
import { Image } from '../../styles/styles';

type TermEntryProps = {
  termEntry: TermEntry;
  functions: ((termEntry: TermEntry) => void)[];
}

const TermEntryCard = ({ termEntry, functions }: TermEntryProps ) => {
  const [handleClick, deleteTermEntry] = functions;

  return (
    <Col sm={6} md={4} lg={3}>
      <Card className="mb-4 box-shadow" id={termEntry._id}>
        {termEntry.image_url && <Image src={termEntry.image_url} onClick={() => handleClick(termEntry)} />}
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

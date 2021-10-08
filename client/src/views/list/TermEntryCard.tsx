import React from 'react';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TermEntry } from '../../types/terms.types';
import { ImageContainer, Image } from '../../styles/styles';

type TermEntryProps = {
  termEntry: TermEntry;
  functions: ((termEntry: TermEntry) => void)[];
}

const TermEntryCard: React.FC<TermEntryProps> = ({ termEntry, functions }) => {
  const [handleClick, deleteTermEntry] = functions;

  return (
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
  );
};

export default TermEntryCard;

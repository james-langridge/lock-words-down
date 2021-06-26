import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const GameTitleInput = (props) => {

  return (
    <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text>Game title:</InputGroup.Text>
      </InputGroup.Prepend>
      <Form.Control
        placeholder="e.g. Syllables..."
        onChange={props.changeGameTitle}
        value={props.gameTitle || ''}
      />
    </InputGroup>
  );
};

export default GameTitleInput;

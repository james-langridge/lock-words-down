import { ChangeEvent } from "react";
import { Form, InputGroup } from "react-bootstrap";

type GameTitleInputProps = {
  gameTitle: string;
  changeGameTitle: (e: ChangeEvent<HTMLInputElement>) => void;
};

const GameTitleInput = ({
  gameTitle,
  changeGameTitle,
}: GameTitleInputProps) => (
  <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text>Game title:</InputGroup.Text>
    </InputGroup.Prepend>
    <Form.Control
      placeholder="e.g. Syllables..."
      onChange={changeGameTitle}
      value={gameTitle || ""}
    />
  </InputGroup>
);

export default GameTitleInput;

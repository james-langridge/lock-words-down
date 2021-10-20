import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import axios from "axios";

const SelectionSave = () => {
  const selectedWords = useAppSelector((state) => state.words.selectedWords);
  const history = useHistory();
  const userId = useAppSelector((state) => state.auth.user.id);
  const [errorMsg, setErrorMsg] = useState("");
  const [titles, setTitles] = useState({
    selectionTitle: "",
    gameTitle: "",
  });

  const handleInputChange = (event: {
    target: { name: string; value: string };
  }) => {
    setTitles({
      ...titles,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      if (titles.selectionTitle.trim() !== "") {
        const data = {
          selectionTitle: titles.selectionTitle,
          gameTitle: titles.gameTitle,
          selectedWords: selectedWords,
          userId: userId,
        };
        setErrorMsg("");

        await axios.post("selection", data);
        history.push("/list");
      } else {
        setErrorMsg("Please enter all the field values.");
      }
    } catch (error: any) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  return (
    <>
      <Form className="form-upload" onSubmit={handleOnSubmit}>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <Row>
          <Col>
            <Form.Group>
              <Form.Label srOnly>Selection name</Form.Label>
              <Form.Control
                type="text"
                name="selectionTitle"
                value={titles.selectionTitle || ""}
                placeholder="What is this selection called for your reference?"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label srOnly>Game name</Form.Label>
              <Form.Control
                type="text"
                name="gameTitle"
                value={titles.gameTitle || ""}
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
                  <th>Term</th>
                  <th>Syllable</th>
                </tr>
              </thead>
              <tbody>
                {selectedWords.map((termEntry) => (
                  <tr key={termEntry._id}>
                    <td>{termEntry.term}</td>
                    <td>{termEntry.syllable}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button className="mx-2" variant="secondary" as={Link} to="/list">
          Cancel
        </Button>
      </Form>
    </>
  );
};

export default SelectionSave;

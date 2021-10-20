import { Col, Form, Row } from "react-bootstrap";
import Submit from "../buttons/Submit";
import Cancel from "../buttons/Cancel";

type StudentFormProps = {
  state: { name: string };
  setState: React.Dispatch<React.SetStateAction<{ name: string }>>;
  handleOnSubmit: (event: { preventDefault: () => void }) => Promise<void>;
  errorMsg: string;
};

const StudentForm = ({
  state,
  setState,
  handleOnSubmit,
  errorMsg,
}: StudentFormProps) => {
  const handleInputChange = (event: {
    target: { name: string; value: string };
  }) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Form className="form-upload" onSubmit={handleOnSubmit}>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Row>
        <Col>
          <Form.Group controlId="name">
            <Form.Label>Student Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={state.name || ""}
              placeholder="Enter student name"
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Submit />
      <Cancel />
    </Form>
  );
};

export default StudentForm;

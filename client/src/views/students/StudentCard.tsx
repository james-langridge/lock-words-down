import { Col, Button, ButtonGroup, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Student } from '../../types/students.types';

type StudentCardProps = {
  student: Student;
  functions: ((student: Student) => void)[];
}

const StudentCard = ({ student, functions }: StudentCardProps ) => {
  const [handleClick, deleteTermEntry] = functions;

  return (
    <Col sm={6} md={4} lg={3}>
      <Card className="mb-4 box-shadow" id={student._id}>
        <Card.Body>
          <Card.Title>{student.name}</Card.Title>
          <div className="d-flex justify-content-between align-items-center">
            <ButtonGroup size="sm">
              <Button variant="outline-secondary" onClick={() => handleClick(student)}>Select</Button>
              <Button variant="outline-secondary" as={Link} to={'/students/edit?id=' + student._id}>Edit</Button>
              <Button variant="outline-secondary" onClick={() => deleteTermEntry(student)}>Delete</Button>
            </ButtonGroup>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default StudentCard;

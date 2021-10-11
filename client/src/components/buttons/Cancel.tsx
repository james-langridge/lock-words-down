import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

const Cancel = () =>
    <Button
      className="mx-2"
      variant="secondary"
      as={Link}
      to="/list"
    >
      Cancel
    </Button>;

export default Cancel;

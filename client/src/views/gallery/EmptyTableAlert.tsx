import { Link } from "react-router-dom";
import { Alert } from 'react-bootstrap';

const EmptyTableAlert = () =>
    <Alert variant="danger" className="my-0 mx-auto">
      <Alert.Link
        as={Link}
        to="/upload"
      >
        Add some terms!
      </Alert.Link>
    </Alert>;

export default EmptyTableAlert;

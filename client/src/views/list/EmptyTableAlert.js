import React from 'react';
import { Link } from "react-router-dom";
import { Alert } from 'react-bootstrap';

const EmptyTableAlert = () => {

  return (
    <Alert variant="primary">
      <Alert.Link
        as={Link}
        to="/upload"
      >
        Add some terms!
      </Alert.Link>
    </Alert>
  );
};

export default EmptyTableAlert;

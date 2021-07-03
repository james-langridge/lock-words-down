import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import SortAlpha from '../../components/buttons/SortAlpha';
import SortModified from '../../components/buttons/SortModified';

const TableButtons = (props) =>
    <ButtonGroup size="sm" className="mb-3">
      <SortAlpha/>
      <SortModified/>
      {Object.keys(props.selectedSelection).length !== 0 &&
        <Button
          variant="outline-danger"
          onClick={() => props.deleteSelection(props.selectedSelection)}
        >
          Delete selection
        </Button>
      }
    </ButtonGroup>;

export default TableButtons;

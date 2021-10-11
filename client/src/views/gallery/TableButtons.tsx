import { Button, ButtonGroup } from 'react-bootstrap';
import SortAlpha from '../../components/buttons/SortAlpha';
import SortModified from '../../components/buttons/SortModified';
import { Selection } from '../../types/terms.types';

type TableButtonsProps = {
  selectedSelection: Selection | null,
  deleteSelection: (selectedSelection: Selection) => void
}

const TableButtons = ({ selectedSelection, deleteSelection }: TableButtonsProps) =>
    <ButtonGroup size="sm" className="mb-3">
      <SortAlpha/>
      <SortModified/>
      {selectedSelection && Object.keys(selectedSelection).length !== 0 &&
        <Button
          variant="outline-danger"
          onClick={() => deleteSelection(selectedSelection)}
        >
          Delete selection
        </Button>
      }
    </ButtonGroup>;

export default TableButtons;

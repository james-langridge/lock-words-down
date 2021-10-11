import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Syllable } from '../../types/game.types';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 25px;
  padding: 8px;
  margin: 8px;
  background-color: #F6FCE6;
  display: inline-block;
`;
// background-color: ${props => (props.isDragging ? 'lightgreen' : '#F6FCE6')};

type SyllableProps = {
  syllable: Syllable,
  index: number
}

const SyllableIcon = ({ syllable, index }: SyllableProps) => {
  return (
    <Draggable draggableId={syllable.id} index={index}>
    {(provided, snapshot) => (
      <Container
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        data-isDragging={snapshot.isDragging}
      >
        {syllable.content}
      </Container>
    )}
    </Draggable>
  );
}

export default SyllableIcon;

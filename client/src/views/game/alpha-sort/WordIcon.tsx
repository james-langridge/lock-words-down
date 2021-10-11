import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Word } from '../../../types/game.types';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: #F6FCE6;
`;
// background-color: ${props => (props.isDragging ? 'lightgreen' : '#F6FCE6')};

type WordIconProps = {
  word: Word,
  index: number
}

const WordIcon = (props: WordIconProps) => {
  return (
    <Draggable draggableId={props.word.id} index={props.index}>
    {(provided, snapshot) => (
      <Container
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        data-isDragging={snapshot.isDragging}
      >
        {props.word.content}
      </Container>
    )}
    </Draggable>
  );
}

export default WordIcon;

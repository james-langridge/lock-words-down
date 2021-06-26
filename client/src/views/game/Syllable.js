import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 25px;
  padding: 8px;
  margin: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : '#F6FCE6')};
  display: inline-block;
`;

const Syllable = (props) => {
  return (
    <Draggable draggableId={props.syllable.id} index={props.index}>
    {(provided, snapshot) => (
      <Container
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        isDragging={snapshot.isDragging}
      >
        {props.syllable.content}
      </Container>
    )}
    </Draggable>
  );
}

export default Syllable;

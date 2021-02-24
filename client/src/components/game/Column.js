import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Syllable from './Syllable';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;
const SyllableList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`;

const Column = (props) => {

  return (
    <Draggable draggableId={props.column.id} index={props.index}>
    {provided => (
      <Container
        {...provided.draggableProps}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
      >
        <img src={props.src} />
        <Droppable droppableId={props.column.id} type="syllable">
          {(provided, snapshot) => (
            <SyllableList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {props.syllables.map((syllable, index) => (
                <Syllable key={syllable.id} syllable={syllable} index={index} />
              ))}
              {provided.placeholder}
            </SyllableList>
          )}
        </Droppable>
      </Container>
      )}
    </Draggable>
  );
}

export default Column;

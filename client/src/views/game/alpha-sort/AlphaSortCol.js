import React from 'react';
import { useSelector } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Word from './Word';
import { WordList, Title } from '../../../styles/styles';

const Container = styled.div`
  width: 222px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border: 1px solid lightgrey;
  border-radius: 2px;
  place-self: center;
`;

const AlphaSortCol = (props) => {
  const title = useSelector(state => state.words.gameTitle);

  return (
      <Container className="box-shadow">
        <Title>{title}</Title>
        <Droppable droppableId={props.column.id}>
          {(provided, snapshot) => (
            <WordList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
              id={props.column.id}
            >
              {props.words.map((word, index) => (
                <Word key={word.id} word={word} index={index} />
              ))}
              {provided.placeholder}
            </WordList>
          )}
        </Droppable>
      </Container>
  );
}

export default AlphaSortCol;

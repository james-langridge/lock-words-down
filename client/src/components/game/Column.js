import React from 'react';
import { useSelector } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Syllable from './Syllable';

const Container = styled.div`
  width: 222px;
  display: flex;
  flex-direction: column;
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  place-self: center;
`;
const SyllableList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? '#485DF0' : '#F6FCE6')};
  flex-grow: 1;
  min-height: 50px;
  text-align: center;
`;
const Title = styled.h3`
  padding: 8px;
  text-align: center;
`;
const ImageContainer = styled.div`
  height: 220px;
  width: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const Column = (props) => {
  const title = useSelector(state => state.words.gameTitle);

  return (
      <Container className="box-shadow">
        {props.column.id === 'column-1' && <Title>{title}</Title>}
        {(props.column.id !== 'column-1' && !props.src) && <Title>{props.word}</Title>}
        {(props.column.id !== 'column-1' && props.src) &&
          <ImageContainer>
            <Image src={props.src} />
          </ImageContainer>
        }
        <Droppable droppableId={props.column.id} type="syllable">
          {(provided, snapshot) => (
            <SyllableList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
              id={props.column.id}
            >
              {props.syllables.map((syllable, index) => (
                <Syllable key={syllable.id} syllable={syllable} index={index} />
              ))}
              {provided.placeholder}
            </SyllableList>
          )}
        </Droppable>
      </Container>
  );
}

export default Column;

import styled from 'styled-components';

export const AlphaSortColumnContainer = styled.div`
  width: 222px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border: 1px solid lightgrey;
  border-radius: 2px;
  place-self: center;
`;

export const ColumnContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  place-self: center;
  color: #5A70D9;
  justify-content: center;
`;

export const Image = styled.img`
  width: auto;
  max-width: 100%;
  height: auto;
  max-height: 100%;
  margin: 0 auto;
`;

export const SyllableList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? '#485DF0' : '#F6FCE6')};
  flex-grow: 1;
  min-height: 50px;
  text-align: center;
`;

export const Title = styled.h3`
  padding: 8px;
  text-align: center;
`;

export const WordList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? '#485DF0' : '#F6FCE6')};
  flex-grow: 1;
  min-height: 50px;
  text-align: center;
`;

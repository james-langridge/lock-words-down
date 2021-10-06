import styled from 'styled-components';

export const Container = styled.div`
  width: 222px;
  display: flex;
  flex-direction: column;
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  place-self: center;
`;

export const RbdContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  max-width: 1000px;
  margin: 0 auto;
  background-color: #F6FCE6;
  color: #5A70D9;
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

export const ImageContainer = styled.div`
  height: 220px;
  width: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

export const WordList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? '#485DF0' : '#F6FCE6')};
  flex-grow: 1;
  min-height: 50px;
  text-align: center;
`;

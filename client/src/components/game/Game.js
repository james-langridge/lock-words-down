import React, { useState } from "react";
import Column from './Column';
import { useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const Game = () => {
  const selectedWords = useSelector(state => state.words.selectedWords);
  const words = selectedWords.map(word => word.word);
  const imagesSrc = selectedWords.map(word => word.image_url);
  const syllables = selectedWords.map(word => word.syllable);
  const initialData = {
    syllables: {},
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'Syllables',
        syllableIds: [],
        src: '',
      },
    },
    columnOrder: ['column-1'],
  };

  syllables.forEach((syllable, i) => {
    initialData.syllables[`syllable-${i+1}`] = {
        id: `syllable-${i+1}`,
        content: syllable
      }
      initialData.columns.['column-1'].syllableIds.push(`syllable-${i+1}`);
  });

  words.forEach((word, i) => {
    const columnId = `column-${i+2}`;
    initialData.columns[columnId] = {
        id: columnId,
        title: word,
        syllableIds: [],
      }
    initialData.columnOrder.push(columnId);
  });

  imagesSrc.forEach((src, i) => {
    const columnId = `column-${i+2}`;
    initialData.columns[columnId].src = src
  })

  const [state, setState] = useState(initialData);

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newSyllableIds = Array.from(start.syllableIds);
      newSyllableIds.splice(source.index, 1);
      newSyllableIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        syllableIds: newSyllableIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    const startSyllableIds = Array.from(start.syllableIds);
    startSyllableIds.splice(source.index, 1);
    const newStart = {
      ...start,
      syllableIds: startSyllableIds,
    };

    const finishSyllableIds = Array.from(finish.syllableIds);
    finishSyllableIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      syllableIds: finishSyllableIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        {state.columnOrder.map(columnId => {
          const column = state.columns[columnId];
          const syllables = column.syllableIds.map(syllableId => state.syllables[syllableId]);
          const imageSrc = column.src;

          return <Column key={column.id} column={column} syllables={syllables} src={imageSrc} />
        })}
      </Container>
    </DragDropContext>
  );
}

export default Game;

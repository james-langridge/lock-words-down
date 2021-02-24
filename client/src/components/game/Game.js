import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import Column from './Column';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const Game = () => {
  const dispatch = useDispatch();
  const shuffle = array =>
    [...Array(array.length)]
      .map((...args) => Math.floor(Math.random() * (args[1] + 1)))
      .reduce( (a, rv, i) => ([a[i], a[rv]] = [a[rv], a[i]]) && a, array);
  const selectedWords = useSelector(state => state.words.selectedWords);
  const syllables = shuffle(selectedWords.map(word => word.syllable));
  const columnsData = selectedWords.map(word => {
    const data = {};
    data.word = word.word;
    data.image_url = word.image_url;

    return data;
  });
  const shuffledColumnsData = shuffle([...columnsData]);
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

  shuffledColumnsData.forEach((item, i) => {
    const columnId = `column-${i+2}`;
    initialData.columns[columnId] = {
        id: columnId,
        title: item.word,
        syllableIds: [],
        src: item.image_url,
      }
    initialData.columnOrder.push(columnId);
  });

  const [state, setState] = useState(initialData);

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };

      setState(newState);
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

  const clearSelectedWords = () => dispatch({ type: 'words/unselectAllWords' })

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Button variant="primary" as={Link} to="/list" onClick={clearSelectedWords}>Admin</Button>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
      {provided => (
        <Container
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {state.columnOrder.map((columnId, index) => {
            const column = state.columns[columnId];
            const syllables = column.syllableIds.map(syllableId => state.syllables[syllableId]);
            const imageSrc = column.src;

            return <Column key={column.id} column={column} syllables={syllables} src={imageSrc} index={index} />
          })}
          {provided.placeholder}
        </Container>
      )}
      </Droppable>
    </DragDropContext>
  );
}

export default Game;

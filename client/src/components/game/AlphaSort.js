import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import AlphaSortCol from './AlphaSortCol';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const AlphaSort = () => {
  const shuffle = array =>
    [...Array(array.length)]
      .map((...args) => Math.floor(Math.random() * (args[1] + 1)))
      .reduce( (a, rv, i) => ([a[i], a[rv]] = [a[rv], a[i]]) && a, array);
  const selectedWords = useSelector(state => state.words.selectedWords);
  const words = shuffle(selectedWords.map(word => word.term));
  const columnData = selectedWords.map(word => {
    const data = {};
    data.term = word.term;

    return data;
  });
  const shuffledcolumnData = shuffle([...columnData]);
  const initialData = {
    words: {
      // id: `word-${i+1}`,
      // content: word
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'Words',
        wordIds: [],
      },
    },
    columnOrder: ['column-1'],
  };

  words.forEach((word, i) => {
    initialData.words[`word-${i+1}`] = {
        id: `word-${i+1}`,
        content: word
      }
      initialData.columns.['column-1'].wordIds.push(`word-${i+1}`);
  });

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

    const column = state.columns[source.droppableId];
    const newWordIds = Array.from(column.wordIds);
    newWordIds.splice(source.index, 1);
    newWordIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      wordIds: newWordIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn,
      },
    };

    setState(newState);
  };

  const correctAnswers = words.sort();

  const checkAnswers = () => {
    for (const column in state.columns) {
      const answers = state.columns[column].wordIds.map(wordId => state.words[wordId].content)
      const element = document.getElementById(column);
      let isCorrect = true;

      for (let i = 0; i < answers.length; i++) {
        if (answers[i] !== correctAnswers[i]) {
          isCorrect = false;
        }
      }

      if (isCorrect) {
        element.classList.add('bg-success');
        return setTimeout(() => { element.classList.remove('bg-success'); }, 2000);
      } else {
        element.classList.add('bg-danger');
        return setTimeout(() => { element.classList.remove('bg-danger'); }, 2000);
      }
    }
  }

  useEffect(() => {
    document.body.style.backgroundColor = "#F6FCE6";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.backgroundColor = "white";
      document.body.style.overflow = "auto";
    }
  }, []);

  return (
    <>
      <Navbar variant="dark" fixed="top" bg="dark">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mb-2 mb-md-0">
            <Button variant="primary" size="lg" onClick={() => checkAnswers()}>Check answers</Button>
          </Nav>
        </Navbar.Collapse>
        <Nav>
          <Nav.Item>
            <Button size="sm" variant="outline-secondary" as={Link} to="/list">Exit</Button>
          </Nav.Item>
        </Nav>
      </Navbar>
      <DragDropContext onDragEnd={onDragEnd}>
        {state.columnOrder.map((columnId, index) => {
          const column = state.columns[columnId];
          const words = column.wordIds.map(wordId => state.words[wordId]);

          return <AlphaSortCol key={column.id} column={column} words={words} index={index} />
        })}
      </DragDropContext>
    </>
  );
}

export default AlphaSort;

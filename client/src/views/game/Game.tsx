import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { DragDropContext } from 'react-beautiful-dnd';
import { Link } from "react-router-dom";
import { Button, Nav, Navbar } from 'react-bootstrap';
import ColumnCard from './ColumnCard';
import { TermEntry } from '../../types/terms.types';
import { Syllable, Column, GivenAnswer, CorrectAnswer } from '../../types/game.types';
import { shuffle } from '../../utils/helpers';
import { RbdContainer } from '../../styles/styles';

const Game = () => {
  const selectedWords = useAppSelector(state => state.words.selectedWords);
  const enableScrolling = useAppSelector(state => state.game.enableScrolling);

  type InitialData = {
    syllables: {
      [key: string]: Syllable
    },
    columns: {
      [key: string]: Column
    },
    columnOrder: string[]
  }

  // create initial column state data for drag and drop logic
  const initialData: InitialData = {
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

  // create array of syllables, randomise its order
  const syllables = shuffle(selectedWords.map((termEntry: TermEntry) => termEntry.syllable));

  // add the syllables to the initial data
  syllables.forEach((syllable, i) => {
    initialData.syllables[`syllable-${i+1}`] = {
        id: `syllable-${i+1}`,
        content: syllable
      }
    initialData.columns['column-1'].syllableIds.push(`syllable-${i+1}`);
  });

  // create array of objects containing word and optional image url for each column
  const columnsData = selectedWords.map((termEntry: TermEntry) => {
    const data = {
      term: '',
      image_url: ''
    };
    data.term = termEntry.term;
    data.image_url = termEntry.image_url ?? '';

    return data;
  });

  // randomise order of columns data
  const shuffledColumnsData = shuffle([...columnsData]);

  // add the columns to the initial data
  shuffledColumnsData.forEach((termEntry, i) => {
    const columnId = `column-${i+2}`;
    initialData.columns[columnId] = {
        id: columnId,
        title: termEntry.term,
        syllableIds: [],
        src: termEntry.image_url,
      }
    initialData.columnOrder.push(columnId);
  });

  // put all the data into state for main drag and drop logic
  const [state, setState] = useState(initialData);

  // drag and drop logic
  const onDragEnd = (result: any) => {
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

  // create array of correct answers for the checkAnswers function
  const correctAnswers = selectedWords.map((termEntry: TermEntry) => {
    const data = {
      term: '',
      syllable: ''
    };
    data.term = termEntry.term;
    data.syllable = termEntry.syllable;

    return data;
  });

  const checkAnswers = () => {
    const givenAnswers: GivenAnswer[] = [];

    for (const column in state.columns) {
      const columnObj = state.columns[column];
      const obj: GivenAnswer = {
        columnId: '',
        term: '',
        syllable: ''
      };
      obj.columnId = columnObj.id;
      obj.term = columnObj.title;
      if (columnObj.syllableIds.length === 1) {
        obj.syllable = state.syllables[columnObj.syllableIds[0]].content;
      } else {
        obj.syllable = columnObj.syllableIds.map(syllableId => state.syllables[syllableId].content);
      }

      givenAnswers.push(obj);
    }

    // remove first "answer" because it's the column that initially holds the syllables
    givenAnswers.splice(0,1);

    correctAnswers.forEach((correctAnswer: CorrectAnswer) => {
      const givenAnswer = givenAnswers.find( e => e.term === correctAnswer.term );
      const element = document.getElementById(givenAnswer!.columnId);
      if (givenAnswer!.syllable === correctAnswer.syllable) {
        element!.classList.add('bg-success');
        setTimeout(() => { element!.classList.remove('bg-success'); }, 2000);
      } else {
        element!.classList.add('bg-danger');
        setTimeout(() => { element!.classList.remove('bg-danger'); }, 2000);
      }
    });
  }

  useEffect(() => {
    // this background colour is best for reading with dyslexia
    document.body.style.backgroundColor = "#F6FCE6";
    document.body.style.overflow = enableScrolling === 'true' ? "auto" : "hidden";

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
        <RbdContainer>
          {state.columnOrder.map((columnId, index) => {
            const column = state.columns[columnId];
            const syllables = column.syllableIds.map(syllableId => state.syllables[syllableId]);
            const imageSrc = column.src;
            const term = column.title;

            return <ColumnCard
                      key={column.id}
                      column={column}
                      syllables={syllables}
                      src={imageSrc}
                      index={index}
                      term={term}
                    />
          })}
        </RbdContainer>
      </DragDropContext>
    </>
  );
}

export default Game;

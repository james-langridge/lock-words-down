import {useState, useEffect, ChangeEvent} from 'react';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import axios from 'axios';
import { Alert, Container, Row } from 'react-bootstrap';
import EmptyTableAlert from '../gallery/EmptyTableAlert';
import GameTitleInput from '../gallery/GameTitleInput';
import ScrollingToggle from '../gallery/ScrollingToggle';
import TableButtons from '../../components/buttons/TableButtons';
import TermEntryCard from '../termEntries/TermEntryCard';
import { TermEntry, Selection } from '../../types/terms.types';

const TermEntryList = () => {
  const userId = useAppSelector((state) => state.auth.user.id);
  const gameTitle = useAppSelector((state) => state.game.gameTitle);
  const selectedWords = useAppSelector((state) => state.words.selectedWords);
  const termEntries = useAppSelector((state) => state.words.wordList);
  const selectedSelection = useAppSelector((state) => state.selections.selectedSelection);
  const selectedStudent = useAppSelector((state) => state.students.selectedStudent);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedSelection) {
      selectedSelection.selection.forEach(word => {
        document.getElementById(word._id)!.classList.add('bg-success');
      });
    }
  }, []);

  const getTermEntries = async () => {
    try {
      const { data } = await axios.get<TermEntry[]>(`term/all/${userId}`);
      setErrorMsg('');
      dispatch({ type: 'setWordList', payload: data })
    } catch (error: any) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  const deleteTermEntry = async (termEntry: TermEntry) => {
    const result = window.confirm(`Delete word: ${termEntry.term}? You cannot undo this!`)
    if (result) {
      try {
        await axios.delete<TermEntry>(`term/${termEntry._id}`);
        setErrorMsg('');
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          setErrorMsg('Error while deleting term.  Try again later.');
        }
      }
      if (selectedWords.find((e: TermEntry) => e.term === termEntry.term)) {
        dispatch({ type: 'unselectWord', payload: termEntry })
      }
      getTermEntries();
    }
  };

  const getSelections = async () => {
    try {
      const { data } = await axios.get<Selection[]>(`selection/${userId}`);
      setErrorMsg('');
      if (data) {
        dispatch({ type: 'selections/setSelectionList', payload: data });
      }
    } catch (error: any) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  const deleteSelection = async (selectedSelection: Selection) => {
    const result = window.confirm(`Delete selection: ${selectedSelection.selectionTitle}? You cannot undo this!`)
    if (result) {
      try {
        await axios.delete<Selection>(`selection/${selectedSelection._id}`);
        setErrorMsg('');
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          setErrorMsg('Error while deleting selection.  Try again later.');
        }
      }
      dispatch({ type: 'selections/unselectSelection' });
      dispatch({ type: 'game/setGameTitle', payload: '' });
      getSelections();
    }
  };

  const handleClick = (word: TermEntry) => {
    if (selectedSelection) {
      dispatch({ type: 'selections/unselectSelection' });
    }
    document.getElementById(word._id)!.classList.toggle('bg-success');
    if (!selectedWords.find((e: TermEntry) => e.term === word.term)) {
      dispatch({ type: 'selectWord', payload: word })
    } else {
      dispatch({ type: 'unselectWord', payload: word })
    }
  }

  const changeGameTitle = (e:ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'game/setGameTitle', payload: e.target.value });
  };

  const toggleScrolling = () => {
    dispatch({ type: 'game/toggleScrolling' });
  };

  return (
    <Container>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <GameTitleInput
        changeGameTitle={changeGameTitle}
        gameTitle={gameTitle}
      />
      <ScrollingToggle
        toggleScrolling={toggleScrolling}
      />
      <br />
      <Alert variant={selectedStudent ? 'success' : 'danger'}>
        Student: {selectedStudent ? selectedStudent.name : 'none selected'}
      </Alert>
      <Alert variant={selectedSelection ? 'success' : 'danger'}>
        Word Selection: {selectedSelection ? selectedSelection.selectionTitle : 'none selected'}
      </Alert>
      <TableButtons
        selectedSelection={selectedSelection}
        deleteSelection={deleteSelection}
      />
      <Row>
        {termEntries.length > 0 ?
          termEntries.map((termEntry: TermEntry) =>
          <TermEntryCard
            termEntry={termEntry}
            functions={[handleClick, deleteTermEntry]}
            key={termEntry._id}
          />) :
          <EmptyTableAlert />
        }
      </Row>
    </Container>
  );
};

export default TermEntryList;

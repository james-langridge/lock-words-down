import {useState, useEffect, ChangeEvent} from 'react';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
import EmptyTableAlert from './EmptyTableAlert';
import GameTitleInput from './GameTitleInput';
import ScrollingToggle from './ScrollingToggle';
import TableButtons from './TableButtons';
import TermEntryCard from '../termEntries/TermEntryCard';
import { TermEntry, Selection } from '../../types/terms.types';

const TermEntryList = () => {
  const userId = useAppSelector((state) => state.auth.user.id);
  const gameTitle = useAppSelector((state) => state.game.gameTitle);
  const selectedWords = useAppSelector((state) => state.words.selectedWords);
  const termEntries = useAppSelector((state) => state.words.wordList);
  const selectedSelection = useAppSelector((state) => state.selections.selectedSelection);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const dispatch = useAppDispatch();

  const getTermEntries = async () => {
    try {
      const { data } = await axios.get<TermEntry[]>(`term/all/${userId}`);
      setErrorMsg('');
      dispatch({ type: 'setWordList', payload: data })
    } catch (error: any) {
      error.response && setErrorMsg(error.response.data);
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

  useEffect(() => {
    getTermEntries();
    getSelections();
  }, []);

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
     {selectedSelection && <h1>{selectedSelection.selectionTitle}</h1>}
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

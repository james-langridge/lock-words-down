import React, {useState, useEffect, ChangeEvent} from 'react';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
import EmptyTableAlert from './EmptyTableAlert';
import GameTitleInput from './GameTitleInput';
import SelectionHeading from './SelectionHeading';
import TableButtons from './TableButtons';
import TermEntryCard from './TermEntryCard';
import { TermEntry, Selection } from '../../types/terms.types';
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const TermEntryList: React.FC = () => {
  const userId = useAppSelector((state) => state.auth.user.id);
  const gameTitle = useAppSelector((state) => state.game.gameTitle);
  const selectedWords = useAppSelector((state) => state.words.selectedWords);
  const termEntries = useAppSelector((state) => state.words.wordList);
  const selectedSelection = useAppSelector((state) => state.selections.selectedSelection);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const dispatch = useAppDispatch();

  const getTermEntries = async () => {
    try {
      const { data } = await axios.get(`term/all/${userId}`);
      setErrorMsg('');
      dispatch({ type: 'setWordList', payload: data })
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  const getSelections = async () => {
    try {
      const { data } = await axios.get(`selection/${userId}`);
      setErrorMsg('');
      dispatch({ type: 'selections/setSelectionList', payload: data });
    } catch (error) {
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
        await axios.delete(`term/${termEntry._id}`);
        setErrorMsg('');
      } catch (error) {
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
        await axios.delete(`selection/${selectedSelection._id}`);
        setErrorMsg('');
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrorMsg('Error while deleting selection.  Try again later.');
        }
      }
      dispatch({ type: 'selections/selectSelection', payload: '' });
      dispatch({ type: 'game/setGameTitle', payload: '' });
      getSelections();
    }
  };

  const handleClick = (word: TermEntry) => {
    if (selectedSelection) {
      dispatch({ type: 'selections/selectSelection', payload: '' });
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

  return (
    <Container>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <GameTitleInput
        changeGameTitle={changeGameTitle}
        gameTitle={gameTitle}
      />
      <SelectionHeading selectedSelection={selectedSelection} />
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

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Button from 'react-bootstrap/Button';
import ArrowDown from '../icons/ArrowDown';
import ArrowUp from '../icons/ArrowUp';
import { TermEntry } from '../../types/terms.types';

const SortModified = () => {
  const [sortDirection, setsortDirection] = useState('za');
  const wordList = useAppSelector(state => state.words.wordList);
  const dispatch = useAppDispatch();

  const compare = (a: TermEntry, b: TermEntry) => {
    if ( a.updatedAt < b.updatedAt ) {
      if (sortDirection === 'za') {
        return -1;
      } else {
        return 1;
      }
    }
    if ( a.updatedAt > b.updatedAt ) {
      if (sortDirection === 'za') {
        return 1;
      } else {
        return -1;
      }
    }

    return 0;
  }

  const handleClick = () => {
    const newWordList = [...wordList];
    newWordList.sort(compare);
    dispatch({ type: 'setWordList', payload: newWordList })
    if (sortDirection === 'az') {
      setsortDirection('za');
    } else {
      setsortDirection('az');
    }
  }

  return (
    <Button
      variant="outline-info"
      onClick={() => handleClick()}
    >
      Modified {sortDirection === 'az' ? <ArrowDown/> : <ArrowUp/>}
    </Button>
  );
};

export default SortModified;

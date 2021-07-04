import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ArrowDown from '../icons/ArrowDown';
import ArrowUp from '../icons/ArrowUp';

const SortAlpha = () => {
  const [sortDirection, setsortDirection] = useState('za');
  const wordList = useSelector(state => state.words.wordList);
  const dispatch = useDispatch();

  const compare = (a,b) => {
    if ( a.term < b.term ) {
      if (sortDirection === 'za') {
        return -1;
      } else {
        return 1;
      }
    }
    if ( a.term > b.term ) {
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
      onClick={() => handleClick()}
      variant="outline-info"
    >
      Name {sortDirection === 'az' ? <ArrowDown/> : <ArrowUp/>}
    </Button>
  );
};

export default SortAlpha;

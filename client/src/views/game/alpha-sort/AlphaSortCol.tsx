import { useAppSelector } from "../../../store/hooks";
import { Droppable } from 'react-beautiful-dnd';
import WordIcon from './WordIcon';
import { WordList, Title, AlphaSortColumnContainer } from '../../../styles/styles';
import { Word, AlphaSortColumn } from '../../../types/game.types';

type AlphaSortColProps = {
  column: AlphaSortColumn,
  words: Word[]
}

const AlphaSortCol = ({ column, words }: AlphaSortColProps) => {
  const title = useAppSelector(state => state.game.gameTitle);

  return (
      <AlphaSortColumnContainer className="box-shadow">
        <Title>{title}</Title>
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <WordList
              ref={provided.innerRef}
              {...provided.droppableProps}
              data-isDraggingOver={snapshot.isDraggingOver}
              id={column.id}
            >
              {words.map((word, index) => (
                <WordIcon key={word.id} word={word} index={index} />
              ))}
              {provided.placeholder}
            </WordList>
          )}
        </Droppable>
      </AlphaSortColumnContainer>
  );
}

export default AlphaSortCol;

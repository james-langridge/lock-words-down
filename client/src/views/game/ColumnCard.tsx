import { Droppable } from "react-beautiful-dnd";
import SyllableIcon from "./SyllableIcon";
import { Syllable, Column } from "../../types/game.types";
import {
  ColumnContainer,
  SyllableList,
  Title,
  Image,
} from "../../styles/styles";
import { useAppSelector } from "../../store/hooks";

type ColumnCardProps = {
  column: Column;
  syllables: Syllable[];
  src: string;
  index: number;
  term: string;
};

const ColumnCard = (props: ColumnCardProps) => {
  const title = useAppSelector((state) => state.game.gameTitle);

  return (
    <ColumnContainer className="box-shadow">
      {props.column.id === "column-1" && <Title>{title}</Title>}
      {props.column.id !== "column-1" && !props.src && (
        <Title>{props.term}</Title>
      )}
      {props.column.id !== "column-1" && props.src && <Image src={props.src} />}
      <Droppable droppableId={props.column.id} type="syllable">
        {(provided, snapshot) => (
          <SyllableList
            ref={provided.innerRef}
            {...provided.droppableProps}
            data-isDraggingOver={snapshot.isDraggingOver}
            id={props.column.id}
          >
            {props.syllables.map((syllable, index) => (
              <SyllableIcon
                key={syllable.id}
                syllable={syllable}
                index={index}
              />
            ))}
            {provided.placeholder}
          </SyllableList>
        )}
      </Droppable>
    </ColumnContainer>
  );
};

export default ColumnCard;

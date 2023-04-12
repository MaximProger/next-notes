import type { Identifier, XYCoord } from "dnd-core";
import { IDragItem, INote, ItemTypes } from "@/types";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Tooltip } from "react-tooltip";
import { useLoaded } from "@/hooks";
import { useStateContext } from "@/contexts/NotesContext";

interface IProps {
  note: INote;
  id: number | string;
  index: number;
  open(value: number | string): void;
  remove(noteId: number | string): void;
  move: (dragIndex: number, hoverIndex: number) => void;
}

const NoteCard = ({ note, id, index, open, remove, move }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const loaded = useLoaded();
  const { theme } = useStateContext();

  const [{ handlerId }, drop] = useDrop<
    IDragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: IDragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      move(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
      className="group/note-card block md:p-6 p-3 bg-secondary dark:bg-secondaryDark border rounded-lg hover:border-tertiary hover:shadow cursor-pointer relative"
      onClick={() => open(note.id)}
    >
      <button
        data-tooltip-id="view-btn"
        data-tooltip-content="Delete"
        data-tooltip-variant={loaded && theme === "light" ? "dark" : "light"}
        type="button"
        className="absolute top-1 right-1 hover:opacity-75 invisible transition-all group-hover/note-card:visible"
        onClick={(e) => {
          e.stopPropagation();
          remove(note.id);
        }}
      >
        <Tooltip id="delete-btn" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          width={24}
          height={24}
        >
          <path
            fill="#7EBDC2"
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
          />
        </svg>
      </button>
      <h5 className="mb-2 md:text-2xl xs:text-xl text-lg font-bold tracking-tight">
        {note.title.length > 50
          ? note.title.slice(0, 50).trim() + "..."
          : note.title}
      </h5>
      <p className="font-normal md:text-base text-sm">
        {note.body.length > 100
          ? note.body.slice(0, 100).trim() + "..."
          : note.body}
      </p>
    </div>
  );
};

export default NoteCard;

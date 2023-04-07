import { INote } from "@/types";

interface IProps {
  note: INote;
  open(value: number | string): void;
  remove(noteId: number | string): void;
}

const NoteCard = ({ note, open, remove }: IProps) => {
  return (
    <div
      className="group/note-card block p-6 bg-secondary border rounded-lg transition-all hover:border-tertiary hover:shadow cursor-pointer relative"
      onClick={() => open(note.id)}
    >
      <button
        type="button"
        className="absolute z-[1] top-1 right-1 hover:opacity-75 invisible transition-all group-hover/note-card:visible"
        onClick={(e) => {
          e.stopPropagation();
          remove(note.id);
        }}
      >
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
      <h5 className="mb-2 text-2xl font-bold tracking-tight">
        {note.title.length > 50
          ? note.title.slice(0, 50).trim() + "..."
          : note.title}
      </h5>
      <p className="font-normal">
        {note.body.length > 100
          ? note.body.slice(0, 100).trim() + "..."
          : note.body}
      </p>
    </div>
  );
};

export default NoteCard;

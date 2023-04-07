import { INote } from "@/types";

interface IProps {
  note: INote;
  open(value: number): void;
}

const NoteCard = ({ note, open }: IProps) => {
  return (
    <div
      className="block p-6 bg-secondary border rounded-lg transition-all hover:border-tertiary hover:shadow cursor-pointer"
      onClick={() => open(note.id)}
    >
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

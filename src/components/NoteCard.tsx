import { INote } from "@/types";

interface IProps {
  title: string;
  body: string;
  toggle(value: boolean): void;
}

const NoteCard = ({ title, body, toggle }: IProps) => {
  return (
    <div className="block p-6 bg-secondary border rounded-lg transition-all hover:border-tertiary hover:shadow cursor-pointer" onClick={() => toggle(true)}>
      <h5 className="mb-2 text-2xl font-bold tracking-tight">
        {title.length > 50 ? title.slice(0, 50).trim() + "..." : title}
      </h5>
      <p className="font-normal">
        {body.length > 100 ? body.slice(0, 100).trim() + "..." : body}
      </p>
    </div>
  );
};

export default NoteCard;

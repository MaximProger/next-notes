import { INote } from "@/types";
import React from "react";
import { NoteCard } from ".";
import { useStateContext } from "@/contexts/NotesContext";
import { useLoaded } from "@/hooks";

interface IProps {
  notes: INote[];
  open(value: number | string): void;
  remove(noteId: number | string): void;
}

const NotesList = ({ notes, open, remove }: IProps) => {
  const { view } = useStateContext();
  const loaded = useLoaded();

  return (
    <>
      {notes.length ? (
        <div
          className={`grid ${
            loaded && view === "list" ? "grid-cols-1" : "grid-cols-4"
          } gap-[16px] mt-4`}
        >
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} open={open} remove={remove} />
          ))}
        </div>
      ) : (
        <p className="mt-4">No notes</p>
      )}
    </>
  );
};

export default NotesList;

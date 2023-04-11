import { INote } from "@/types";
import React, { useCallback } from "react";
import { NoteCard } from ".";
import { useStateContext } from "@/contexts/NotesContext";
import { useLoaded } from "@/hooks";

interface IProps {
  notes: INote[];
  open(value: number | string): void;
  remove(noteId: number | string): void;
  move: (dragIndex: number, hoverIndex: number) => void;
}

const NotesList = ({ notes, open, remove, move }: IProps) => {
  const { view } = useStateContext();
  const loaded = useLoaded();

  const renderCard = useCallback((note: INote, index: number) => {
    return (
      <NoteCard
        key={note.id}
        id={note.id}
        index={index}
        note={note}
        open={open}
        remove={remove}
        move={move}
      />
    );
  }, []);

  return (
    <>
      {notes.length ? (
        <div
          className={`grid ${
            loaded && view === "list" ? "grid-cols-1" : "grid-cols-4"
          } gap-[16px] mt-4`}
        >
          {notes.map((note, index) => renderCard(note, index))}
        </div>
      ) : (
        <p className="mt-4">No notes</p>
      )}
    </>
  );
};

export default NotesList;

import { Form, Navbar, NoteModal } from "@/components";
import { NoteCard } from "@/components";
import { INote } from "@/types";
import { FormEvent, useEffect, useState } from "react";

export default function Home({ data }: { data: INote[] }) {
  const [showModal, setShowModal] = useState(false);
  const [noteId, setNoteId] = useState<number>(-1);
  const [notes, setNotes] = useState(data);

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        closeModal();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const openModal = (noteId: number) => {
    setShowModal(true);
    setNoteId(noteId);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const createNote = (e: FormEvent, note: INote) => {
    e.preventDefault();
    setNotes([note, ...notes]);
  };

  const removeNote = (noteId: number | string) => {
    setNotes(notes.filter((note) => note.id != noteId));
  };

  const editNote = (
    noteId: string | number | undefined,
    editNote: { title: string; body: string }
  ) => {
    setNotes(
      notes.map((note) => {
        if (note.id === noteId) {
          return { ...note, ...editNote };
        }

        return note;
      })
    );
    closeModal();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 max-w-[1200px]">
        <Form create={createNote} />
        {notes?.length ? (
          <div className="grid grid-cols-4 gap-[16px] mt-4">
            {notes?.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                open={openModal}
                remove={removeNote}
              />
            ))}
          </div>
        ) : (
          <p className="mt-4">No notes</p>
        )}
      </div>
      {showModal && (
        <NoteModal
          title="Hello"
          body="Lorem"
          close={closeModal}
          edit={editNote}
          noteId={noteId}
          notes={notes}
        />
      )}
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=0&_limit=8`
  );
  const data = await res.json();

  return { props: { data } };
}

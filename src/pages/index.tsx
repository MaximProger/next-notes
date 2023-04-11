import {
  CreateForm,
  Navbar,
  NoteModal,
  NotesList,
  Preloader,
} from "@/components";
import { NoteCard } from "@/components";
import { notesReducer } from "@/reducer/notesReducer";
import { INote } from "@/types";
import { ChangeEvent, FormEvent, useEffect, useReducer, useState } from "react";
import { ContextProvider } from "@/contexts/NotesContext";
import { useLoaded } from "@/hooks";

export default function Home({ data }: { data: INote[] }) {
  const [showModal, setShowModal] = useState(false);
  const [noteId, setNoteId] = useState<number>(-1);
  const [query, setQuery] = useState("");
  const [notes, dispatch] = useReducer(notesReducer, data);
  const results = filterItems(notes, query);
  const loaded = useLoaded();

  function filterItems(notes: INote[], query: string) {
    query = query.toLowerCase();
    return notes.filter(
      (notes) =>
        notes.title
          .split(" ")
          .some((word) => word.toLowerCase().startsWith(query)) ||
        notes.body
          .split(" ")
          .some((word) => word.toLowerCase().startsWith(query))
    );
  }

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
    dispatch({
      type: "create_note",
      note: note,
    });
  };

  const removeNote = (noteId: number | string) => {
    dispatch({
      type: "remove_note",
      noteId: noteId,
    });
  };

  const editNote = (
    noteId: string | number | undefined,
    editNote: { title: string; body: string }
  ) => {
    dispatch({
      type: "update_note",
      noteId: noteId,
      editNote: editNote,
    });
    closeModal();
  };

  const searchNotes = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <ContextProvider>
      {!loaded && <Preloader />}
      <Navbar searchNotes={searchNotes} />
      <div className="container mx-auto p-4 max-w-[1200px]">
        <CreateForm create={createNote} />
        <NotesList notes={results} open={openModal} remove={removeNote} />
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
    </ContextProvider>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=0&_limit=8`
  );
  const data = await res.json();

  return { props: { data } };
}

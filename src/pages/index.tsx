import { Form, Navbar, NoteModal } from "@/components";
import { NoteCard } from "@/components";
import { INote } from "@/types";
import { useEffect, useState } from "react";
import { useStateContext } from "@/context/ContextProvider";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [noteId, setNoteId] = useState<number>(-1);

  const { notes } = useStateContext();

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

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 max-w-[1200px]">
        <Form />
        {notes?.length ? (
          <div className="grid grid-cols-4 gap-[16px] mt-4">
            {notes?.map((note) => (
              <NoteCard key={note.id} note={note} open={openModal} />
            ))}
          </div>
        ) : (
          <p>No notes</p>
        )}
      </div>
      {showModal && (
        <NoteModal
          title="Hello"
          body="Lorem"
          close={closeModal}
          noteId={noteId}
          notes={notes}
        />
      )}
    </>
  );
}

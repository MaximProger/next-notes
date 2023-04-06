import { Navbar, NoteModal } from "@/components";
import { NoteCard } from "@/components";
import { INote } from "@/types";
import { useState } from "react";

export default function Home({ data: notes }: { data: INote[] }) {
  const [showModal, setShowModal] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  console.log(showModal);

  const toggleModal = (toggle: boolean) => {
    setShowModal(toggle);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 max-w-[1200px]">
        <div className="grid grid-cols-4 gap-[16px]">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              title={note.title}
              body={note.body}
              toggle={toggleModal}
            />
          ))}
        </div>
      </div>
      <NoteModal
        title="Hello"
        body="Lorem"
        show={showModal}
        toggle={toggleModal}
      />
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=0&_limit=10`
  );
  const data = await res.json();

  return { props: { data } };
}

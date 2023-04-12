import { INote } from "@/types";
import { useState } from "react";
import { motion } from "framer-motion";

interface IProps {
  noteId: number | undefined | null;
  notes: INote[];
  close(): void;
  edit(
    noteId: string | number | undefined,
    editNote: { title: string | undefined; body: string | undefined }
  ): void;
}

const NoteModal = ({ noteId, notes, close, edit }: IProps) => {
  const note = notes.find((el) => el.id === noteId);
  const [editNote, setEditNote] = useState({
    title: note?.title,
    body: note?.body,
  });
  const [isShowInputTitle, setIsShowInputTitle] = useState(false);
  const [isShowInputBody, setIsShowInputBody] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 300, damping: 24 },
        }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.1 }}
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        onClick={() => close()}
      >
        <div
          className="relative w-full my-6 mx-auto max-w-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-secondary dark:bg-secondaryDark outline-none focus:outline-none transition-colors">
            {/*header*/}
            <div className="flex items-start justify-between px-5 py-8 border-b border-solid border-slate-300 rounded-t">
              {isShowInputTitle ? (
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="w-full h-max text-3xl font-semibold bg-none outline-none border border-fontColor dark:border-fontColorDark bg-transparent rounded-lg p-2 transition-colors"
                  value={editNote.title}
                  onChange={(e) =>
                    setEditNote({
                      ...editNote,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              ) : (
                <h3
                  className="text-3xl w-full min-h-[18px] font-semibold cursor-pointer select-none"
                  onClick={(e) => {
                    switch (e.detail) {
                      case 1: {
                        break;
                      }
                      case 2: {
                        setIsShowInputTitle(true);
                        break;
                      }
                      default: {
                        break;
                      }
                    }
                  }}
                >
                  {note?.title}
                </h3>
              )}
              <button
                type="button"
                className="absolute z-[1] top-1 right-1 hover:opacity-75 transition-all"
                onClick={() => close()}
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
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              {isShowInputBody ? (
                <textarea
                  id="body"
                  name="body"
                  className="w-full h-[250px] text-lg leading-relaxed bg-none outline-none border border-fontColor dark:border-fontColorDark bg-transparent rounded-lg p-2 transition-colors"
                  onChange={(e) =>
                    setEditNote({
                      ...editNote,
                      [e.target.name]: e.target.value,
                    })
                  }
                  value={editNote.body}
                >
                  {editNote.body}
                </textarea>
              ) : (
                <p
                  className="my-4 text-lg leading-relaxed cursor-pointer select-none"
                  onClick={(e) => {
                    switch (e.detail) {
                      case 1: {
                        break;
                      }
                      case 2: {
                        setIsShowInputBody(true);
                        break;
                      }
                      default: {
                        break;
                      }
                    }
                  }}
                >
                  {note?.body}
                </p>
              )}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-300 rounded-b">
              <button
                className="text-accent background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => close()}
              >
                Close
              </button>
              <button
                className="bg-tertiary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => edit(note?.id, editNote)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        className="opacity-25 fixed inset-0 z-40 bg-black"
      ></motion.div>
    </>
  );
};

export default NoteModal;

import { INote } from "@/types";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import uuid from "react-uuid";
import { AnimatePresence, motion } from "framer-motion";
interface IProps {
  create(e: FormEvent, note: INote): void;
}

const Form = ({ create }: IProps) => {
  const [note, setNote] = useState({
    title: "",
    body: "",
  });
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    const onClick = (e) => {
      const target = e.target;
      formRef.current.contains(target) || setShowForm(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    setNote({ ...note, [target.name]: target.value });
  };

  return (
    <form
      ref={formRef}
      onClick={(e) => e.stopPropagation()}
      onSubmit={(e) => {
        create(e, { ...note, userId: uuid(), id: uuid() });
        setNote({
          title: "",
          body: "",
        });
      }}
    >
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="mb-6"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              className="bg-transparent border border-fontColor dark:border-fontColorDark text-fontColor dark:text-fontColorDark rounded-lg focus:bg-secondary dark:focus:bg-secondaryDark outline-none block w-full p-4 transition-colors"
              value={note.title}
              onChange={(e) => handleChange(e)}
            />
          </motion.div>
        )}

        <div className={`${showForm ? "mb-6" : ""}`}>
          <textarea
            className={`${
              !showForm
                ? "h-[58px] resize-none cursor-pointer hover:bg-secondary dark:bg-secondaryDark"
                : "h-full"
            }  bg-transparent border border-fontColor dark:border-fontColorDark text-fontColor dark:text-fontColorDark rounded-lg focus:bg-secondary dark:focus:bg-secondaryDark outline-none block w-full p-4 transition-all`}
            name="body"
            id="body"
            placeholder={showForm ? "The note" : "Create note"}
            value={note.body}
            onClick={() => setShowForm(true)}
            onChange={(e) => handleChange(e)}
            required
          ></textarea>
        </div>
        {showForm && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-tertiary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="submit"
          >
            Create
          </motion.button>
        )}
      </AnimatePresence>
    </form>
  );
};

export default Form;

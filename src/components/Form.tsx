import { MouseEvent } from "react";
import { INote } from "@/types";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import uuid from "react-uuid";
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
      <div className={`mb-6 ${!showForm ? "hidden" : ""}`}>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          className="bg-transparent border border-fontColor text-fontColor rounded-lg focus:bg-secondary outline-none block w-full p-4 transition-all"
          value={note.title}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className={`${showForm ? "mb-6" : ""}`}>
        <textarea
          className={`${
            !showForm
              ? "h-[58px] resize-none cursor-pointer hover:bg-secondary"
              : ""
          } bg-transparent border border-fontColor text-fontColor rounded-lg focus:bg-secondary outline-none block w-full p-4 transition-all`}
          name="body"
          id="body"
          placeholder="The note"
          value={note.body}
          onClick={() => setShowForm(true)}
          onChange={(e) => handleChange(e)}
          required
        ></textarea>
      </div>
      <button
        className={`${
          !showForm ? "hidden" : ""
        } bg-tertiary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
        type="submit"
      >
        Create
      </button>
    </form>
  );
};

export default Form;

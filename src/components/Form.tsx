import React, { ChangeEvent, FormEvent, useState } from "react";

const Form = () => {
  const [note, setNote] = useState({
    title: "",
    text: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    setNote({ ...note, [target.name]: target.value });
  };

  const handlerNoteCreate = (e: FormEvent) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <form onSubmit={handlerNoteCreate}>
      <div className="mb-6">
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          className="bg-transparent border border-fontColor text-fontColor rounded-lg focus:bg-secondary outline-none block w-full p-4 transition-all"
          title={note.title}
          onChange={(e) => handleChange(e)}
          required
        />
      </div>
      <div className="mb-6">
        <textarea
          className="bg-transparent border border-fontColor text-fontColor rounded-lg focus:bg-secondary outline-none block w-full p-4 transition-all"
          name="text"
          id="text"
          placeholder="The note"
          value={note.text}
          onChange={(e) => handleChange(e)}
          required
        ></textarea>
      </div>
      <button
        className="bg-tertiary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="submit"
      >
        Create
      </button>
    </form>
  );
};

export default Form;

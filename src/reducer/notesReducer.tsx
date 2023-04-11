import { INote } from "@/types";

export function notesReducer(notes: INote[], action) {
  switch (action.type) {
    case "create_note": {
      return [action.note, ...notes];
    }
    case "remove_note": {
      return notes.filter((note) => note.id != action.noteId);
    }
    case "update_note": {
      return notes.map((note) => {
        if (note.id === action.noteId) {
          return { ...note, ...action.editNote };
        }

        return note;
      });
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

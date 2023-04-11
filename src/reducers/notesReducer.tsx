import { INote } from "@/types";
import update from "immutability-helper";

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
    case "move_notes": {
      return update(notes, {
        $splice: [
          [action.dragIndex, 1],
          [action.hoverIndex, 0, notes[action.dragIndex] as INote],
        ],
      });
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

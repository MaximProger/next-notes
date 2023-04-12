export interface INote {
  userId: number | string
  id: number | string
  title: string
  body: string
}
export interface IContext {
  view: string | null,
  changeView(): void,
  theme: string | null,
  changeTheme(): void,
}

export interface IDragItem {
  index: number;
  id: string;
  type: string;
}

export interface IAction {
  type: "create_note" | "remove_note" | "update_note" | "move_notes";
  note?: INote;
  noteId?: number | string;
  editNote?: INote;
  dragIndex?: number;
  hoverIndex?: number;
}

export const ItemTypes = {
  CARD: 'card',
}

interface ActionCreate {
  type: "create_note";
  note: INote;
}

interface ActionRemove {
  type: "remove_note";
  noteId: number | string;
}

interface ActionUpdate {
  type: "update_note";
  noteId: string | number | undefined;
  editNote: { title: string; body: string; };
}

interface ActionMove {
  type: "move_notes";
  dragIndex: number;
  hoverIndex: number;
}

export type Action = ActionCreate | ActionRemove | ActionUpdate | ActionMove;
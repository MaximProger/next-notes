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

export const ItemTypes = {
  CARD: 'card',
}

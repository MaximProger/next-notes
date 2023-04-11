export interface INote {
  userId: number | string
  id: number | string
  title: string
  body: string
}

export interface IContext {
  changeView(): void,
  view: string | null
}
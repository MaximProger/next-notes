import { INote } from "@/types";
import React, { ReactNode, createContext, useContext } from "react";

interface IProps {
  children: ReactNode;
  data: INote[];
}

interface IContext {
  notes: INote[];
}

const StateContext = createContext<IContext>({} as IContext);

export const ContextProvider = ({ children, data: notes }: IProps) => {
  return (
    <StateContext.Provider value={notes}>{children}</StateContext.Provider>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=0&_limit=8`
  );
  const data = await res.json();

  return { props: { data } };
}

export const useStateContext = () => useContext(StateContext);

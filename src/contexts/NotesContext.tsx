import { ReactNode, createContext, useContext, useState } from "react";
import { IContext } from "@/types";

const StateContext = createContext<IContext>({} as IContext);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const getView = () => {
    if (typeof window !== "undefined" && localStorage.getItem("view")) {
      return localStorage.getItem("view");
    }

    return "grid";
  };
  const [view, setView] = useState(getView());

  const changeView = () => {
    const value = view === "grid" ? "list" : "grid";
    setView(value);

    if (typeof window !== "undefined") {
      localStorage.setItem("view", value);
    }
  };

  return (
    <StateContext.Provider value={{ changeView, view }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

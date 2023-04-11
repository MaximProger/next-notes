import { ReactNode, createContext, useContext, useState } from "react";
import { IContext } from "@/types";

const StateContext = createContext<IContext>({} as IContext);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const getLocalStorageValue = (key: string, defaultValue: string) => {
    if (typeof window !== "undefined" && localStorage.getItem(key)) {
      return localStorage.getItem(key);
    }

    return defaultValue;
  };

  const [view, setView] = useState(getLocalStorageValue("view", "grid"));
  const [theme, setTheme] = useState(getLocalStorageValue("theme", "light"));

  const changeView = () => {
    const value = view === "grid" ? "list" : "grid";
    setView(value);

    if (typeof window !== "undefined") {
      localStorage.setItem("view", value);
    }
  };

  const changeTheme = () => {
    const value = theme === "light" ? "dark" : "light";
    setTheme(value);

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", value);
    }
  };

  return (
    <StateContext.Provider value={{ view, changeView, theme, changeTheme }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

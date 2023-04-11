import "@/styles/globals.css";
import "react-tooltip/dist/react-tooltip.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import { ContextProvider } from "@/contexts/NotesContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

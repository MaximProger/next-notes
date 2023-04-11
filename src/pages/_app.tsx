import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "react-tooltip/dist/react-tooltip.css";
import { ContextProvider } from "@/contexts/NotesContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

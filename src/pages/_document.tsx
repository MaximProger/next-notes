import { ContextProvider } from "@/context/ContextProvider";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <ContextProvider>
        <body className="font-poppins text-fontColor text-base bg-primary overflow-x-hidden">
          <Main />
          <NextScript />
        </body>
      </ContextProvider>
    </Html>
  );
}

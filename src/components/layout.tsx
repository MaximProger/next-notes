import { useStateContext } from "@/contexts/NotesContext";
import { ChangeEvent, ReactNode } from "react";
import { CustomHead, Navbar, Preloader } from ".";
import { useLoaded } from "@/hooks";
import { ToastContainer } from "react-toastify";

interface IProps {
  children: ReactNode;
  search(e: ChangeEvent<HTMLInputElement>): void;
}

const Layout = ({ children, search }: IProps) => {
  const { theme } = useStateContext();
  const loaded = useLoaded();

  return (
    <main className={`${loaded && theme}`}>
      <div
        className={
          "font-poppins text-fontColor dark:text-fontColorDark text-base bg-primary dark:bg-primaryDark min-h-screen"
        }
      >
        <ToastContainer />
        {!loaded && <Preloader />}
        <CustomHead />
        <Navbar search={search} />
        <div className="container mx-auto md:p-4 p-2 max-w-[1200px]">
          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;

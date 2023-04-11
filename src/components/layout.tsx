import { useStateContext } from "@/contexts/NotesContext";
import { ChangeEvent, ReactNode } from "react";
import { CustomHead, Navbar, Preloader } from ".";
import { useLoaded } from "@/hooks";

interface IProps {
  children: ReactNode;
  search(e: ChangeEvent<HTMLInputElement>): void;
}

const Layout = ({ children, search }: IProps) => {
  const { theme } = useStateContext();
  const loaded = useLoaded();

  console.log(theme);

  return (
    <div className={`${loaded && theme}`}>
      <div
        className={
          "font-poppins text-fontColor text-base bg-primary dark:bg-fontColor min-h-screen"
        }
      >
        {!loaded && <Preloader />}
        <CustomHead />
        <Navbar search={search} />
        <div className="container mx-auto p-4 max-w-[1200px]">{children}</div>
      </div>
    </div>
  );
};

export default Layout;

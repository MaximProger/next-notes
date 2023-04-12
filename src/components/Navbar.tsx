import React, { ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import logoWhite from "@/assets/images/logo-white.svg";
import { useStateContext } from "@/contexts/NotesContext";
import { useLoaded } from "@/hooks";
import { Tooltip } from "react-tooltip";

interface IProps {
  search(e: ChangeEvent<HTMLInputElement>): void;
}

const Navbar = ({ search }: IProps) => {
  const { view, changeView, theme, changeTheme } = useStateContext();
  const loaded = useLoaded();

  return (
    <nav className="bg-secondary dark:bg-secondaryDark border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto md:p-4 p-2 order-1">
        <Link href="/" className="flex items-center">
          <Image
            src={loaded && theme === "light" ? logo : logoWhite}
            alt="Notes"
            width={64}
            height={40}
          />
        </Link>
        <input
          className="bg-transparent border-[1px] border-fontColor dark:border-fontColorDark rounded-md h-[40px] w-full md:max-w-[400px] max-w-none text-fontColor dark:text-fontColorDark px-[12px] outline-none focus:bg-primary dark:focus:bg-primaryDark md:order-2 order-4 md:mt-0 mt-4"
          name="search"
          id="search"
          type="text"
          placeholder="Search"
          onChange={search}
        />
        <div className="flex gap-[16px] order-3">
          <button
            data-tooltip-id="theme-btn"
            data-tooltip-content={
              loaded && theme === "light" ? "Dark mode" : "Light mode"
            }
            data-tooltip-variant={
              loaded && theme === "light" ? "dark" : "light"
            }
            data-tooltip-place="bottom"
            onClick={() => changeTheme()}
            type="button"
            className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-transparent border-[1px] border-fontColor dark:border-fontColorDark transition-colors hover:bg-primary dark:hover:bg-primaryDark"
          >
            <Tooltip id="theme-btn" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              width={24}
              height={24}
            >
              <path
                fill={loaded && theme === "light" ? "#231F20" : "#ffffff"}
                d="M297.2 248.9C311.6 228.3 320 203.2 320 176c0-70.7-57.3-128-128-128S64 105.3 64 176c0 27.2 8.4 52.3 22.8 72.9c3.7 5.3 8.1 11.3 12.8 17.7l0 0c12.9 17.7 28.3 38.9 39.8 59.8c10.4 19 15.7 38.8 18.3 57.5H109c-2.2-12-5.9-23.7-11.8-34.5c-9.9-18-22.2-34.9-34.5-51.8l0 0 0 0c-5.2-7.1-10.4-14.2-15.4-21.4C27.6 247.9 16 213.3 16 176C16 78.8 94.8 0 192 0s176 78.8 176 176c0 37.3-11.6 71.9-31.4 100.3c-5 7.2-10.2 14.3-15.4 21.4l0 0 0 0c-12.3 16.8-24.6 33.7-34.5 51.8c-5.9 10.8-9.6 22.5-11.8 34.5H226.4c2.6-18.7 7.9-38.6 18.3-57.5c11.5-20.9 26.9-42.1 39.8-59.8l0 0 0 0 0 0c4.7-6.4 9-12.4 12.7-17.7zM192 128c-26.5 0-48 21.5-48 48c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-44.2 35.8-80 80-80c8.8 0 16 7.2 16 16s-7.2 16-16 16zm0 384c-44.2 0-80-35.8-80-80V416H272v16c0 44.2-35.8 80-80 80z"
              />
            </svg>
          </button>
          <button
            data-tooltip-id="view-btn"
            data-tooltip-content={
              loaded && view === "list" ? "Grid view" : "List view"
            }
            data-tooltip-variant={
              loaded && theme === "light" ? "dark" : "light"
            }
            data-tooltip-place="bottom"
            onClick={() => changeView()}
            type="button"
            className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-transparent border-[1px] border-fontColor dark:border-fontColorDark transition-colors hover:bg-primary dark:hover:bg-primaryDark"
          >
            <Tooltip id="view-btn" />
            {loaded && view === "list" ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 11H9C10.1 11 11 10.1 11 9V5C11 3.9 10.1 3 9 3H5C3.9 3 3 3.9 3 5V9C3 10.1 3.9 11 5 11ZM5 21H9C10.1 21 11 20.1 11 19V15C11 13.9 10.1 13 9 13H5C3.9 13 3 13.9 3 15V19C3 20.1 3.9 21 5 21ZM13 5V9C13 10.1 13.9 11 15 11H19C20.1 11 21 10.1 21 9V5C21 3.9 20.1 3 19 3H15C13.9 3 13 3.9 13 5ZM15 21H19C20.1 21 21 20.1 21 19V15C21 13.9 20.1 13 19 13H15C13.9 13 13 13.9 13 15V19C13 20.1 13.9 21 15 21Z"
                  fill={loaded && theme === "light" ? "#231F20" : "#ffffff"}
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width={24}
                height={24}
              >
                <path
                  fill={loaded && theme === "light" ? "#231F20" : "#ffffff"}
                  d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

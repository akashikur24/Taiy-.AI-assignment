import { X } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ToogleProp } from "../types/types";

//aside only display when the max-width:640px
const Aside: React.FC<ToogleProp> = ({ setToggle }) => {
  //to style the active nav Item
  const location = useLocation();
  return (
    <nav className="w-3/4 z-50 h-full absolute top-0 p-4 bg-white border-x-2 border-gray-400 md:hidden">
      <X
        onClick={() => setToggle((prev) => !prev)}
        className="cursor-pointer"
      />
      <ul className="mt-8 flex flex-col gap-y-4">
        <Link to="/">
          <li
            className={`px-4 py-2 text-lg cursor-pointer rounded ${
              location.pathname === "/"
                ? "bg-gray-500 text-white"
                : "hover:bg-gray-500 hover:text-white transition-all"
            }`}
            onClick={() => setToggle((prev) => !prev)}
          >
            Contacts
          </li>
        </Link>
        <Link to="/charts-and-maps">
          <li
            className={`px-4 py-2 text-lg cursor-pointer rounded ${
              location.pathname === "/charts-and-maps"
                ? "bg-gray-500 text-white"
                : "hover:bg-gray-500 hover:text-white transition-all"
            }`}
            onClick={() => setToggle((prev) => !prev)}
          >
            Charts and Maps
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Aside;

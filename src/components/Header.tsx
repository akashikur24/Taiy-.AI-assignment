import { MenuIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { ToogleProp } from "../types/types";

export const Header: React.FC<ToogleProp> = ({ setToggle }) => {
  const location = useLocation();
  //to get the title of the current page ise location
  const getTitle = (path: string) => {
    switch (path) {
      case "/":
        return "Contacts Page";
      case "/charts-and-maps":
        return "Charts and Maps Page";
      default:
        return "Contact Page";
    }
  };

  return (
    <div className="header h-16 bg-blue-600 w-full flex justify-center items-center max-sm:justify-around">
      <MenuIcon
        color="white"
        className="hidden cursor-pointer max-sm:block"
        onClick={() => setToggle((prev) => !prev)}
      />
      <h1 className="text-2xl font-semibold text-white">
        {getTitle(location.pathname)}
      </h1>
    </div>
  );
};

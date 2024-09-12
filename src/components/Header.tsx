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
    <div className="header h-16 bg-blue-600 relative flex items-center justify-center">
      <MenuIcon
        color="white"
        className="absolute top-4 left-4 hidden cursor-pointer max-md:block "
        onClick={() => setToggle((prev) => !prev)}
      />
      <h1 className="text-2xl text-center  font-semibold text-white max-md:text-xl">
        {getTitle(location.pathname)}
      </h1>
    </div>
  );
};

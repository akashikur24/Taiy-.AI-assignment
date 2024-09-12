import { Link, useLocation } from "react-router-dom";

const Slidebar = () => {
  //check the location to indiate the active nv item
  const location = useLocation();
  return (
    <nav className="w-1/6 p-4  border-x-2 border-gray-400 max-sm:hidden">
      <ul className="flex flex-col gap-y-4">
        <Link to="/">
          <li
            className={`px-4 py-2 text-lg cursor-pointer rounded ${
              location.pathname === "/"
                ? "bg-gray-500 text-white"
                : "hover:bg-gray-500 hover:text-white transition-all "
            }`}
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
          >
            Charts and Maps
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Slidebar;

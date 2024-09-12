import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChartsAndMapsPage from "./pages/ChartsAndMapsPage";
import Slidebar from "./components/Slidebar";
import ContactsPage from "./pages/ContactsPage";
import { Header } from "./components/Header";
import Aside from "./components/Aside";

const App: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(true);
  const handleToggle = () => setToggle((prev) => !prev);
  return (
    <Router>
      <Header setToggle={handleToggle} />
      <div className="flex h-[calc(100vh-4rem)] bg-gray-100">
        <Slidebar />
        <div className="w-5/6 bg-gray-100 relative overflow-y-auto max-sm:w-full">
          <Routes>
            <Route path="/" element={<ContactsPage />} />
            <Route path="/charts-and-maps" element={<ChartsAndMapsPage />} />
          </Routes>
        </div>
      </div>
      {/* only for the small devices */}
      {toggle && <Aside setToggle={handleToggle} />}
    </Router>
  );
};

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Playground from "./pages/Playground/Playground";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/playground' element={<Playground />} />
      </Routes>
    </div>
  );
};

export default App;

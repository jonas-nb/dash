import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CandidatoPage from "./pages/CandidatoPage";
import BairroPage from "./pages/BairroPage";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/candidato" element={<CandidatoPage />} />
        <Route path="/bairro" element={<BairroPage />} />
      </Routes>
    </div>
  );
};

export default App;

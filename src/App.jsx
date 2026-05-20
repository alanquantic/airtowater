import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Logos from './pages/Logos.jsx';
import Icosahedron from './pages/Icosahedron.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/logos" element={<Logos />} />
      <Route path="/icosahedron" element={<Icosahedron />} />
    </Routes>
  );
}

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Logos from './pages/Logos.jsx';
import Icosahedron from './pages/Icosahedron.jsx';
import Pdfs from './pages/Pdfs.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/logos" element={<Logos />} />
      <Route path="/icosahedron" element={<Icosahedron />} />
      <Route path="/pdfs" element={<Pdfs />} />
    </Routes>
  );
}

export default App;

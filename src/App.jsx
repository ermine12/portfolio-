import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hobbies from './Hobbies';
import DetectiveBoard from './DetectiveBoard';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DetectiveBoard />} />
        <Route path="/hobbies" element={<Hobbies />} />
      </Routes>
    </Router>
  );
}

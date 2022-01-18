import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AppBar from './components/AppBar/AppBar';
import ReportPage from './pages/ReportPage';
import HomePage from './pages/HomePage';
import Example from './views/example';

function App() {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="report" element={<ReportPage />} />
        <Route path="example" element={<Example />} />
      </Routes>
    </>
  );
}

export default App;

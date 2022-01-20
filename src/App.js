import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AppBar from './components/AppBar/AppBar';
import ReportPage from './pages/ReportPage';
import HomePage from './pages/HomePage';
import CommonPage from './pages/CommonPage';

function App() {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/balance" element={<CommonPage />} />
        <Route path="report" element={<ReportPage />} />
      </Routes>
    </>
  );
}

export default App;

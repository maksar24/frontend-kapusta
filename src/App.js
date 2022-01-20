import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AppBar from './components/AppBar/AppBar';
import ReportPage from './pages/ReportPage';
import HomePage from './pages/HomePage';
import BalancePage from './pages/BalancePage';

function App() {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="report" element={<ReportPage />} />
        <Route path="/balance" element={<BalancePage />} />
      </Routes>
    </>
  );
}

export default App;

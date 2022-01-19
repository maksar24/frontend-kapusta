import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AppBar from './components/AppBar/AppBar';
import ReportPage from './pages/ReportPage';
import HomePage from './pages/HomePage';
import AddTransactionsPage from './pages/AddTransactionPage';

function App() {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="report" element={<ReportPage />} />
        <Route path="/transaction" element={<AddTransactionsPage />} />
      </Routes>
    </>
  );
}

export default App;

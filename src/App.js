import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AppBar from './components/AppBar/AppBar';
import ReportPage from './pages/ReportPage';
import HomePage from './pages/HomePage';
import CommonPage from './pages/CommonPage';
import AddTransactionView from './views/AddTransactionView';

function App() {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/balance" element={<CommonPage />} />
        <Route
          exact
          path="/balance/addViaMobile"
          element={<AddTransactionView />}
        />
        <Route path="report" element={<ReportPage />} />
      </Routes>
    </>
  );
}

export default App;

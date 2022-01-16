import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AppBar from './components/AppBar/AppBar';
import ReportPage from './page/ReportPage/ReportPage';
import HomePageView from './pages/HomePageView';

function App() {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<HomePageView />} />
        <Route path="report" element={<ReportPage />} />
      </Routes>
    </>
  );
}

export default App;

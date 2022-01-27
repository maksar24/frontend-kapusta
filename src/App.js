import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import AppBar from './components/AppBar/AppBar';
import ReportPage from './pages/ReportPage';
import HomePage from './pages/HomePage';
import CommonPage from './pages/CommonPage';
import AddTransactionView from './views/AddTransactionView';
// import PrivetRoute from './components/PrivetRoute';

// const AuthView = lazy(() =>
//   import('./pages/HomePage' /* webpackChunkName: "authentication-page" */),
// );

// const MainView = lazy(() =>
//   import('./pages/CommonPage' /* webpackChunkName: "main-page" */),
// );

// const MobilTransactionView = lazy(() =>
//   import('./views/AddTransactionView' /* webpackChunkName: "mobil-tr-page" */),
// );

// const ReportView = lazy(() =>
//   import('./pages/ReportPage' /* webpackChunkName: "report-page" */),
// );

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
      {/* <AppBar />
        <Suspense fallback={'Loading...'}>
          <Routes>
            <Route
              path='/'
              element={
                <AuthView />
              }
            />
            <Route
              path='/balance'
              element={
                <PrivetRoute>
                  <MainView />
                </PrivetRoute>
              }
            />
            <Route
              path='/balance/addViaMobile'
              element={
                <MobilTransactionView />
              }
            />
            <Route
              path='/report'
              element={
                <ReportView />
              }
            />
          </Routes>
        </Suspense> */}
    </>
  );
}

export default App;

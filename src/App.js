import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import AppBar from './components/AppBar/AppBar';
import { PrivetRoute, RedirectRoute } from './helpers/Routes';

const AuthView = lazy(() =>
  import('./pages/HomePage' /* webpackChunkName: "authentication-page" */),
);

const MainView = lazy(() =>
  import('./pages/CommonPage' /* webpackChunkName: "main-page" */),
);

const ReportView = lazy(() =>
  import('./pages/ReportPage' /* webpackChunkName: "report-page" */),
);

function App() {
  return (
    <>
      <AppBar />
      <Suspense fallback={'Loading...'}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivetRoute>
                <MainView />
              </PrivetRoute>
            }
          />
          <Route
            path="/auth"
            element={
              <RedirectRoute>
                <AuthView />
              </RedirectRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ReportView />
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;

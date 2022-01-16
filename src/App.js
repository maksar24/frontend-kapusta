import { Routes, Route } from 'react-router-dom';

import AppBar from './components/AppBar/AppBar';
import ReportPage from './page/ReportPage/ReportPage';
import HomePage from './page/HomePage/HomePage';

function App() {
  return (
    <div>
      <AppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="report" element={<ReportPage />} />
      </Routes>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import DirectResponse from './components/DirectResponse';
import WeeklyScheduler from './components/WeeklyScheduler';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/direct-response" element={<DirectResponse />} />
        <Route path="/weekly-scheduler" element={<WeeklyScheduler />} />
      </Routes>
    </Router>
  );
}

export default App;
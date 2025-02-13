import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <h1>Welcome to My App</h1>
      <div className="options">
        <button onClick={() => navigate('/direct-response')}>Get Direct Response</button>
        <button onClick={() => navigate('/weekly-scheduler')}>Get Weekly Scheduler</button>
      </div>
    </div>
  );
}

export default LandingPage;
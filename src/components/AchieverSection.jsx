import React from 'react';

function AchieverSection({ achievements, setAchievements }) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleAchievementChange = (day, value) => {
    setAchievements((prev) => ({ ...prev, [day]: value }));
  };

  return (
    <div className="achiever-section">
      <h2>Achiever</h2>
      {days.map((day) => (
        <div key={day} className="day-input">
        
          <textarea
            value={achievements[day]}
            onChange={(e) => handleAchievementChange(day, e.target.value)}
            placeholder={`What did you achieve on ${day}?`}
            rows={2}
          />
        </div>
      ))}
    </div>
  );
}

export default AchieverSection;
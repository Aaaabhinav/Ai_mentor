import React from 'react';

function AchieverSection({ achievements, setAchievements }) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleAchievementChange = (day, value) => {
    setAchievements((prev) => ({ ...prev, [day]: value }));
  };

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
      {days.map((day) => (
        <div key={day} className="space-y-2">
          <label className="block text-sm font-medium text-purple-400">
            {day}
          </label>
          <textarea
            value={achievements[day]}
            onChange={(e) => handleAchievementChange(day, e.target.value)}
            placeholder={`What did you achieve on ${day}?`}
            rows={2}
            className="w-full px-4 py-3 bg-gray-800/50 border border-purple-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-transparent resize-none transition-all duration-200"
          />
        </div>
      ))}
    </div>
  );
}

// Add custom scrollbar styles to your global CSS or component
const styles = `
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(107, 33, 168, 0.1);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(147, 51, 234, 0.5);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(147, 51, 234, 0.7);
}
`;

// Add styles to document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default AchieverSection;
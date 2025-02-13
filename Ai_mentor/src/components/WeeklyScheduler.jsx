import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ExpectationSection from './ExpectationSection';
import AchieverSection from './AchieverSection';
import EvaluationResult from './EvaluationResult';
import './WeeklyScheduler.css';

function WeeklyScheduler() {
  const [expectation, setExpectation] = useState('');
  const [achievements, setAchievements] = useState({
    Monday: '',
    Tuesday: '',
    Wednesday: '',
    Thursday: '',
    Friday: '',
    Saturday: '',
    Sunday: '',
  });
  const [evaluationResult, setEvaluationResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Replace with your Google API key

  const API_KEY = 'Your API key';
  const genAI = new GoogleGenerativeAI(API_KEY);

  const handleEvaluate = async () => {
    if (!expectation.trim()) {
      alert('Please enter your expectations.');
      return;
    }

    setIsLoading(true);

    try {
      // Prepare the prompt for Gemini API
      const prompt = `Compare the following weekly expectations and achievements:
        **Expectation:** ${expectation}
        **Achievements:**
        ${Object.entries(achievements)
          .map(([day, achievement]) => `${day}: ${achievement}`)
          .join('\n')}
        
        Provide a detailed comparison and suggestions for improvement.`;

      // Call the Gemini API
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Display the result
      setEvaluationResult(text);
    } catch (error) {
      console.error('Error generating evaluation:', error);
      setEvaluationResult('Failed to generate evaluation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="weekly-scheduler">
      <h1>Weekly Scheduler</h1>
      <div className="sections-container">
        <ExpectationSection expectation={expectation} setExpectation={setExpectation} />
        <AchieverSection achievements={achievements} setAchievements={setAchievements} />
      </div>
      <div className="evaluate-button">
        <button onClick={handleEvaluate} disabled={isLoading}>
          {isLoading ? 'Evaluating...' : 'Evaluate'}
        </button>
      </div>
      <EvaluationResult result={evaluationResult} />
    </div>
  );
}

export default WeeklyScheduler;
import React, { useState, useEffect } from 'react';
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
  const [error, setError] = useState('');

  // Replace with your Google API key

  const API_KEY = 'your api key';
  const genAI = new GoogleGenerativeAI(API_KEY);

  // Function to list available models
  const listAvailableModels = async () => {
    try {
      const models = await genAI.listModels();
      console.log('Available models for weekly scheduler:', models);
    } catch (error) {
      console.error('Error listing models:', error);
      setError(`Error listing models: ${error.message}`);
    }
  };

  // Call listAvailableModels when the component mounts
  useEffect(() => {
    listAvailableModels();
  }, []);

  const handleEvaluate = async () => {
    if (!expectation.trim()) {
      alert('Please enter your expectations.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Prepare the prompt for Gemini API
      const prompt = `Compare the following weekly expectations and achievements:
        **Expectation:** ${expectation}
        **Achievements:**
        ${Object.entries(achievements)
          .map(([day, achievement]) => `${day}: ${achievement}`)
          .join('\n')}
        
        Provide a detailed comparison and suggestions for improvement.`;

      // Updated to use the correct model name for Gemini 1.5 Pro
      // Try with 'gemini-1.5-pro' first, if that fails fall back to 'gemini-pro'
      let model;
      try {
        model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      } catch (modelError) {
        console.log('Falling back to gemini-pro model');
        model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      }

      // Call the Gemini API
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Display the result
      setEvaluationResult(text);
    } catch (error) {
      console.error('Error generating evaluation:', error);
      const errorMessage = `Failed to generate evaluation: ${error.message}. Please check your API key and model access.`;
      setError(errorMessage);
      setEvaluationResult(errorMessage);
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
      {error && <div className="error-message">{error}</div>}
      <EvaluationResult result={evaluationResult} />
    </div>
  );
}

export default WeeklyScheduler;
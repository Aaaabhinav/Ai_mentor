import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ExpectationSection from './ExpectationSection';
import AchieverSection from './AchieverSection';
import EvaluationResult from './EvaluationResult';

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">Weekly Scheduler</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6">
            <ExpectationSection expectation={expectation} setExpectation={setExpectation} />
          </div>
          <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6">
            <AchieverSection achievements={achievements} setAchievements={setAchievements} />
          </div>
        </div>
        
        <div className="flex justify-center mb-8">
          <button 
            onClick={handleEvaluate} 
            disabled={isLoading} 
            className={`text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Evaluating...' : 'Evaluate'}
          </button>
        </div>
        
       
        
        {evaluationResult && (
          <div className="mb-8">
            <EvaluationResult result={evaluationResult} />
          </div>
        )}
      </div>
    </div>
  );
}

export default WeeklyScheduler;
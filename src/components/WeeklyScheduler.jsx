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

  // Use API key from environment variables
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
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
    <div className="min-h-screen bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-center py-1 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Weekly Scheduler
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="feature-card overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl shadow-xl">
            <div className="p-6 bg-gradient-to-r from-purple-500/90 to-purple-700/90 border-b border-purple-600/30">
              <h2 className="text-2xl font-semibold text-white">Weekly Expectations</h2>
            </div>
            <div className="p-6">
              <ExpectationSection expectation={expectation} setExpectation={setExpectation} />
            </div>
          </div>
          
          <div className="feature-card overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl shadow-xl">
            <div className="p-6 bg-gradient-to-r from-purple-500/90 to-purple-700/90 border-b border-purple-600/30">
              <h2 className="text-2xl font-semibold text-white">Daily Achievements</h2>
            </div>
            <div className="p-6">
              <AchieverSection achievements={achievements} setAchievements={setAchievements} />
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button 
            onClick={handleEvaluate} 
            disabled={isLoading} 
            className={`px-8 py-3 text-base font-medium rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-200 transform hover:-translate-y-0.5 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Evaluating...
              </span>
            ) : (
              'Evaluate Progress'
            )}
          </button>
        </div>
        
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}
        
        {evaluationResult && (
          <div className="feature-card overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl shadow-xl">
            <div className="p-6 bg-gradient-to-r from-purple-500/90 to-purple-700/90 border-b border-purple-600/30">
              <h2 className="text-2xl font-semibold text-white">Evaluation Results</h2>
            </div>
            <div className="p-6">
              <EvaluationResult result={evaluationResult} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeeklyScheduler;
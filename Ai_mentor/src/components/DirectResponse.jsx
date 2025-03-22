import React, { useState } from 'react';
import PromptForm from '../PromptForm.jsx';

function DirectResponse() {
  const [response, setResponse] = useState('');
  const [evaluationData, setEvaluationData] = useState(null);

  const handleResponse = (generatedResponse, structuredData) => {
    setResponse(generatedResponse);
    setEvaluationData(structuredData);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">Assignment Evaluation</h1>
        <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6 mb-8">
          <PromptForm onResponse={handleResponse} />
        </div>
        
        {evaluationData ? (
          <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden">
            <h2 className="text-2xl font-semibold p-6 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white">Evaluation Results</h2>
            
            <div className="p-6 border-b border-gray-200 dark:border-gray-600">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Assignment Summary</h3>
                <div className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 rounded-full py-1 px-4 text-lg font-bold">
                  {evaluationData.score}/10
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-left">
                {evaluationData.summary}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 border-b border-gray-200 dark:border-gray-600">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">📊</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{evaluationData.aiPercentage}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">AI Content</div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">📝</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{evaluationData.originalityScore}/10</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Originality</div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">🎯</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{evaluationData.relevanceScore}/10</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Relevance</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-b border-gray-200 dark:border-gray-600">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Strengths</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  {evaluationData.strengths.map((strength, index) => (
                    <li key={index} className="text-left">{strength}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Areas for Improvement</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  {evaluationData.improvements.map((improvement, index) => (
                    <li key={index} className="text-left">{improvement}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Instructor Feedback</h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-gray-700 dark:text-gray-300 text-left">
                {evaluationData.feedback}
              </div>
            </div>
          </div>
        ) : response ? (
          <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Response:</h2>
            <p className="text-gray-700 dark:text-gray-300 text-left whitespace-pre-line">{response}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default DirectResponse;
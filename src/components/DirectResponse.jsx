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
    <div className="min-h-screen bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-center py-1 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Assignment Evaluation
        </h1>

        {/* Form Container */}
        <div className="feature-card p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl shadow-xl">
          <PromptForm onResponse={handleResponse} />
        </div>
        
        {/* Results Container */}
        {evaluationData && (
          <div className="feature-card overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl shadow-xl">
            {/* Header */}
            <div className="p-8 bg-gradient-to-r from-purple-500/90 to-purple-700/90 border-b border-purple-600/30">
              <h2 className="text-3xl font-bold text-white">Evaluation Results</h2>
            </div>
            
            {/* Content */}
            <div className="p-8 space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-700/50">
                <h3 className="text-2xl font-semibold text-purple-300">Assignment Summary</h3>
                <div className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full shadow-lg shadow-purple-500/20">
                  <span className="text-xl font-bold text-white">{evaluationData.score}/10</span>
                </div>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {evaluationData.summary}
                </p>
              </div>
              
              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="feature-card p-6 text-center">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="text-2xl font-bold text-purple-400">{evaluationData.aiPercentage}%</div>
                  <div className="text-sm text-gray-400">AI Content</div>
                </div>
                
                <div className="feature-card p-6 text-center">
                  <div className="text-2xl mb-2">📝</div>
                  <div className="text-2xl font-bold text-purple-400">{evaluationData.originalityScore}/10</div>
                  <div className="text-sm text-gray-400">Originality</div>
                </div>
                
                <div className="feature-card p-6 text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="text-2xl font-bold text-purple-400">{evaluationData.relevanceScore}/10</div>
                  <div className="text-sm text-gray-400">Relevance</div>
                </div>
              </div>
              
              {/* Strengths */}
              <div className="space-y-6 pt-6 border-t border-gray-700/50">
                <h3 className="text-2xl font-semibold text-purple-300">Strengths</h3>
                <ul className="space-y-4">
                  {evaluationData.strengths.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                        {index + 1}
                      </span>
                      <span className="flex-1">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Areas for Improvement */}
              <div className="space-y-6 pt-6 border-t border-gray-700/50">
                <h3 className="text-2xl font-semibold text-purple-300">Areas for Improvement</h3>
                <ul className="space-y-4">
                  {evaluationData.improvements.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                        {index + 1}
                      </span>
                      <span className="flex-1">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Instructor Feedback */}
              {evaluationData.feedback && (
                <div className="space-y-6 pt-6 border-t border-gray-700/50">
                  <h3 className="text-2xl font-semibold text-purple-300">Instructor Feedback</h3>
                  <div className="feature-card p-6">
                    <p className="text-gray-300 leading-relaxed">{evaluationData.feedback}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {response && !evaluationData && (
          <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Response:</h2>
            <p className="text-gray-700 dark:text-gray-300 text-left whitespace-pre-line">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DirectResponse;
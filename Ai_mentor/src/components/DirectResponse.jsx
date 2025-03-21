import React, { useState } from 'react';
import PromptForm from '../PromptForm.jsx';
import './DirectResponse.css';

function DirectResponse() {
  const [response, setResponse] = useState('');
  const [evaluationData, setEvaluationData] = useState(null);

  const handleResponse = (generatedResponse, structuredData) => {
    setResponse(generatedResponse);
    setEvaluationData(structuredData);
  };

  return (
    <div className="direct-response">
      <h1>Assignment Evaluation</h1>
      <PromptForm onResponse={handleResponse} />
      
      {evaluationData ? (
        <div className="evaluation-results">
          <h2>Evaluation Results</h2>
          
          <div className="evaluation-card">
            <div className="evaluation-header">
              <h3>Assignment Summary</h3>
              <div className="score-badge">{evaluationData.score}/10</div>
            </div>
            <div className="evaluation-summary">
              {evaluationData.summary}
            </div>
          </div>
          
          <div className="evaluation-metrics">
            <div className="metric-card">
              <div className="metric-icon">📊</div>
              <div className="metric-value">{evaluationData.aiPercentage}%</div>
              <div className="metric-label">AI Content</div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon">📝</div>
              <div className="metric-value">{evaluationData.originalityScore}/10</div>
              <div className="metric-label">Originality</div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon">🎯</div>
              <div className="metric-value">{evaluationData.relevanceScore}/10</div>
              <div className="metric-label">Relevance</div>
            </div>
          </div>
          
          <div className="evaluation-details">
            <div className="details-section">
              <h3>Strengths</h3>
              <ul>
                {evaluationData.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>
            
            <div className="details-section">
              <h3>Areas for Improvement</h3>
              <ul>
                {evaluationData.improvements.map((improvement, index) => (
                  <li key={index}>{improvement}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="feedback-section">
            <h3>Instructor Feedback</h3>
            <div className="feedback-content">
              {evaluationData.feedback}
            </div>
          </div>
        </div>
      ) : response ? (
        <div className="response-box">
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      ) : null}
    </div>
  );
}

export default DirectResponse;
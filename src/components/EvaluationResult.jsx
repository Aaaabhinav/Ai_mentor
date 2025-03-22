import React from 'react';

function EvaluationResult({ result }) {
  return (
    <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden">
      <h2 className="text-2xl font-semibold p-6 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white">Evaluation Result</h2>
      <div className="p-6">
        <p className="text-gray-700 dark:text-gray-300 text-left whitespace-pre-line">{result}</p>
      </div>
    </div>
  );
}

export default EvaluationResult;
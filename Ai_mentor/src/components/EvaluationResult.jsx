import React from 'react';

function EvaluationResult({ result }) {
  return (
    <div className="evaluation-result">
      <h2>Evaluation Result</h2>
      <p>{result}</p>
    </div>
  );
}

export default EvaluationResult;
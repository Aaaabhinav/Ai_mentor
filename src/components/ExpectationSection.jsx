import React from 'react';

function ExpectationSection({ expectation, setExpectation }) {
  return (
    <div className="expectation-section">
      <h2>Expectation</h2>
      <textarea
        value={expectation}
        onChange={(e) => setExpectation(e.target.value)}
        placeholder="What do you expect to achieve this week?"
        rows={4}
      />
    </div>
  );
}

export default ExpectationSection;
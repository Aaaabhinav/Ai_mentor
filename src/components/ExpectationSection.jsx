import React from 'react';

function ExpectationSection({ expectation, setExpectation }) {
  return (
    <div className="space-y-4">
      <textarea
        value={expectation}
        onChange={(e) => setExpectation(e.target.value)}
        placeholder="What do you expect to achieve this week?"
        rows={6}
        className="w-full px-4 py-3 bg-gray-800/50 border border-purple-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-transparent resize-none transition-all duration-200"
      />
      {!expectation && (
        <p className="text-sm text-gray-500 italic">
          Share your goals and aspirations for the week ahead...
        </p>
      )}
    </div>
  );
}

export default ExpectationSection;
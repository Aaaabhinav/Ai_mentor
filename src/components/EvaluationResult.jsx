import React from 'react';

function EvaluationResult({ result }) {
  // Function to parse the result text and format it with headings
  const formatEvaluation = (text) => {
    if (!text) return null;
    
    // Split the text into lines for processing
    const lines = text.split('\n');
    let formattedContent = [];
    let currentParagraph = [];
    
    lines.forEach((line, index) => {
      // Skip empty lines
      if (line.trim() === '') {
        if (currentParagraph.length > 0) {
          formattedContent.push(
            <p key={`para-${index}`} className="text-gray-700 dark:text-gray-300 mb-4">
              {currentParagraph.join(' ')}
            </p>
          );
          currentParagraph = [];
        }
        return;
      }
      
      // Clean line of all markdown formatting characters
      let cleanedLine = line;
      
      // Check if the line looks like a heading (starts with # or has ** at beginning and end)
      if (line.startsWith('#') || (line.startsWith('**') && line.endsWith('**'))) {
        // Add any current paragraph before starting a new section
        if (currentParagraph.length > 0) {
          formattedContent.push(
            <p key={`para-${index}`} className="text-gray-700 dark:text-gray-300 mb-4">
              {currentParagraph.join(' ')}
            </p>
          );
          currentParagraph = [];
        }
        
        // Format the heading based on its style
        const headingText = line.startsWith('**') 
          ? line.replace(/^\*\*|\*\*$/g, '') 
          : line.replace(/^#+\s+/, '');
        
        formattedContent.push(
          <h3 key={`heading-${index}`} className="text-xl font-semibold text-purple-600 dark:text-purple-400 mt-4 mb-2">
            {headingText}
          </h3>
        );
      } else {
        // Handle regular text as part of a paragraph
        // Remove any ** markdown formatting within the text
        cleanedLine = cleanedLine.replace(/\*\*/g, '');
        currentParagraph.push(cleanedLine);
      }
    });
    
    // Add any remaining paragraph content
    if (currentParagraph.length > 0) {
      formattedContent.push(
        <p key="last-para" className="text-gray-700 dark:text-gray-300 mb-4">
          {currentParagraph.join(' ')}
        </p>
      );
    }
    
    return formattedContent;
  };

  return (
    <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden">
      <h2 className="text-2xl font-semibold p-6 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white">Evaluation Result</h2>
      <div className="p-6">
        {formatEvaluation(result)}
      </div>
    </div>
  );
}

export default EvaluationResult;
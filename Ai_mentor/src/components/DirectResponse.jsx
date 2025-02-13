import React, { useState } from 'react';
import PromptForm from '../PromptForm.jsx';
//import './DirectResponse.css';

function DirectResponse() {
  const [response, setResponse] = useState('');

  const handleResponse = (generatedResponse) => {
    setResponse(generatedResponse);
  };

  return (
    <div className="direct-response">
      <h1>Direct Response</h1>
      <PromptForm onResponse={handleResponse} />
      <div className="response-box">
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default DirectResponse;
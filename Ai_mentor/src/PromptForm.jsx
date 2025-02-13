import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const PromptForm = ({ onResponse }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Replace with your Google API key
  const API_KEY = 'Your API key';
  const genAI = new GoogleGenerativeAI(API_KEY);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);

    try {
      // Initialize the model (replace with the correct model name)
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      // Generate content
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Pass the response back to the parent component
      onResponse(text);
    } catch (error) {
      console.error('Error generating response:', error);
      onResponse('Failed to generate response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="prompt-form">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here..."
        rows={4}
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Response'}
      </button>
    </form>
  );
};

export default PromptForm;
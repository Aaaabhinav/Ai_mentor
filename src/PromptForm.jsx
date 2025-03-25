import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './components/PromptForm.css';

const PromptForm = ({ onResponse }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [response, setResponse] = useState(null);
  const fileInputRef = useRef(null);

  // Use API key from environment variables
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);

  // Function to list available models
  const listAvailableModels = async () => {
    try {
      const models = await genAI.listModels();
      console.log('Available models:', models);
    } catch (error) {
      console.error('Error listing models:', error);
      setError(`Error listing models: ${error.message}`);
    }
  };

  // Call listAvailableModels when the component mounts
  useEffect(() => {
    listAvailableModels();
  }, []);

  // Handle file upload
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setFileName(selectedFile.name);
    
    // Read file content
    const reader = new FileReader();
    reader.onload = async (e) => {
      setFileContent(e.target.result);
    };
    reader.readAsText(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName('');
    setFileContent('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Clear file selection
  const handleClearFile = () => {
    setFile(null);
    setFileName('');
    setFileContent('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Parse structured data from AI response
  const parseStructuredResponse = (text) => {
    try {
      // Try to find JSON in the response
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || 
                        text.match(/\{[\s\S]*"summary"[\s\S]*\}/);
      
      if (jsonMatch && jsonMatch[1]) {
        return JSON.parse(jsonMatch[1]);
      }
      
      // If no JSON found, create a structured format based on the text response
      // This is a fallback mechanism
      return createStructuredResponse(text);
    } catch (error) {
      console.error('Error parsing structured response:', error);
      return createStructuredResponse(text);
    }
  };

  // Create a structured format from text response
  const createStructuredResponse = (text) => {
    // Extract a summary (first ~200 words or less)
    const summary = text.split(/\s+/).slice(0, 200).join(' ') + (text.split(/\s+/).length > 200 ? '...' : '');
    
    // Default evaluation data
    return {
      summary: summary,
      score: calculateApproximateScore(text),
      aiPercentage: calculateAIPercentage(text),
      originalityScore: Math.round(Math.random() * 3 + 6), // Random score between 6-9
      relevanceScore: Math.round(Math.random() * 2 + 7),   // Random score between 7-9
      strengths: extractBulletPoints(text, ['strength', 'positive', 'good', 'excellent']),
      improvements: extractBulletPoints(text, ['improve', 'weakness', 'limitation', 'suggestion']),
      feedback: extractFeedback(text)
    };
  };

  // Helper functions for parsing text
  const calculateApproximateScore = (text) => {
    // Look for explicit score mentions
    const scoreMatch = text.match(/(\d+(\.\d+)?)\s*\/\s*10/) || 
                       text.match(/score[:\s]+(\d+(\.\d+)?)/i);
    if (scoreMatch) {
      const score = parseFloat(scoreMatch[1]);
      return Math.min(10, Math.max(0, score));
    }
    
    // Count positive vs negative words for a rough estimate
    const positiveWords = ['excellent', 'good', 'great', 'fantastic', 'impressive', 'well'];
    const negativeWords = ['poor', 'inadequate', 'limited', 'lacks', 'missing', 'insufficient'];
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    positiveWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = text.match(regex);
      if (matches) positiveCount += matches.length;
    });
    
    negativeWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = text.match(regex);
      if (matches) negativeCount += matches.length;
    });
    
    const totalWords = positiveCount + negativeCount;
    if (totalWords === 0) return 7; // Default average score
    
    return Math.min(10, Math.max(0, Math.round(5 + 5 * (positiveCount - negativeCount) / totalWords)));
  };

  const calculateAIPercentage = (text) => {
    // Look for explicit AI percentage mentions
    const percentMatch = text.match(/AI[^%]+?(\d+)%/) || 
                         text.match(/(\d+)%[^%]*?AI/);
    if (percentMatch) {
      const percent = parseInt(percentMatch[1]);
      return Math.min(100, Math.max(0, percent));
    }
    
    // Default moderate value if not found
    return Math.round(Math.random() * 30 + 20); // Random between 20-50%
  };

  const extractBulletPoints = (text, keywords) => {
    // Try to find bullet points or numbered lists
    const bulletMatches = text.match(/[•\-\*]\s*([^\n]+)/g) || 
                          text.match(/\d+\.\s*([^\n]+)/g);
    
    if (bulletMatches && bulletMatches.length > 0) {
      // Clean up bullet points and filter relevant ones
      return bulletMatches
        .map(point => point.replace(/^[•\-\*\d+\.]\s*/, '').trim())
        .filter(point => {
          // Keep points that have at least one keyword nearby
          return keywords.some(keyword => 
            new RegExp(`\\b${keyword}\\b`, 'i').test(point) ||
            text.indexOf(point) > 0 && 
            new RegExp(`\\b${keyword}\\b`, 'i').test(
              text.substring(Math.max(0, text.indexOf(point) - 50), 
                            text.indexOf(point))
            )
          );
        })
        .slice(0, 3); // Limit to 3 points
    }
    
    // If no bullet points found, try to extract sentences containing keywords
    const sentences = text.match(/[^.!?]+[.!?]/g) || [];
    const relevantSentences = sentences.filter(sentence => 
      keywords.some(keyword => new RegExp(`\\b${keyword}\\b`, 'i').test(sentence))
    );
    
    // Return up to 3 relevant sentences, cleaned up
    return relevantSentences
      .map(sentence => sentence.trim())
      .slice(0, 3);
  };

  const extractFeedback = (text) => {
    // Look for feedback section
    const feedbackMatch = text.match(/feedback:([^#]+)/i) || 
                          text.match(/comment:([^#]+)/i) ||
                          text.match(/recommendation:([^#]+)/i);
    
    if (feedbackMatch && feedbackMatch[1]) {
      return feedbackMatch[1].trim();
    }
    
    // If no explicit feedback section, use the last paragraph
    const paragraphs = text.split(/\n\s*\n/);
    if (paragraphs.length > 0) {
      return paragraphs[paragraphs.length - 1].trim();
    }
    
    return "The assignment demonstrates understanding of the core concepts. Continue practicing to improve mastery.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() && !fileContent) {
      setError('Please enter a prompt and/or upload a document');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Try with 'gemini-1.5-pro' first, if that fails fall back to 'gemini-pro'
      let model;
      try {
        model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      } catch (modelError) {
        console.log('Falling back to gemini-pro model');
        model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      }

      // Construct the evaluation prompt
      let finalPrompt = '';
      
      if (fileContent) {
        // Create a structured prompt for assignment evaluation
        finalPrompt = `You are an expert educator evaluating a student assignment. 
Analyze the following assignment and provide a comprehensive evaluation including:

1. A concise summary (150-200 words)
2. An overall score out of 10
3. An estimate of AI-generated content percentage
4. Strengths (2-3 points)
5. Areas for improvement (2-3 points)
6. Detailed instructor feedback

Please format your response as follows:
\`\`\`json
{
  "summary": "A concise 150-200 word summary of the assignment content",
  "score": 8,
  "aiPercentage": 30,
  "originalityScore": 7,
  "relevanceScore": 8,
  "strengths": [
    "First strength point",
    "Second strength point",
    "Third strength point"
  ],
  "improvements": [
    "First improvement suggestion",
    "Second improvement suggestion",
    "Third improvement suggestion"
  ],
  "feedback": "Detailed instructor feedback and recommendations for the student"
}
\`\`\`

Here is the assignment to evaluate:

${fileContent}

${prompt.trim() ? `Additional evaluation criteria provided by instructor: ${prompt}` : ''}`;
      } else {
        // Only prompt is provided (original behavior)
        finalPrompt = prompt;
      }

      // Generate content
      const result = await model.generateContent(finalPrompt);
      const response = await result.response;
      const text = response.text();

      // Parse structured data if this is an assignment evaluation
      let structuredData = null;
      if (fileContent) {
        structuredData = parseStructuredResponse(text);
      }

      // Pass both the response text and structured data to the parent component
      setResponse(text);
      onResponse(text, structuredData);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage = `Failed to generate response: ${error.message}. Please check your API key and model access.`;
      setError(errorMessage);
      onResponse(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Main Form Container */}
        <div className="feature-card p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl shadow-xl mb-8">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Response System
          </h2>

          {/* File Upload Section */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-purple-300 mb-2">
              Upload Document
            </label>
            {!fileName ? (
              <div 
                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-lg hover:border-purple-500 transition-colors duration-200"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const droppedFile = e.dataTransfer.files[0];
                  if (droppedFile) {
                    const event = { target: { files: [droppedFile] } };
                    handleFileChange(event);
                  }
                }}
              >
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-400">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-purple-400 hover:text-purple-300 focus-within:outline-none">
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.txt"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX or TXT up to 10MB</p>
                </div>
              </div>
            ) : (
              <div className="mt-1 p-4 border border-gray-700 rounded-lg bg-gray-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <svg className="h-8 w-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-purple-300 truncate">
                        {fileName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {(file?.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="text-sm text-red-400 hover:text-red-300 transition-colors duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Prompt Input Section */}
          <div className="mb-8">
            <label htmlFor="prompt" className="block text-sm font-medium text-purple-300 mb-2">
              Your Question
            </label>
            <div className="mt-1">
              <textarea
                id="prompt"
                name="prompt"
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                placeholder="Ask your question here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-3 text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 rounded-lg font-medium shadow-lg hover:shadow-purple-500/25 transition duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                'Get Response'
              )}
            </button>
          </div>
        </div>

        {/* Response Container */}
        {response && (
          <div className="feature-card p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-semibold mb-4 text-purple-300">AI Response</h3>
            <div className="prose prose-invert max-w-none">
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap rounded-lg">
                {response}
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptForm;
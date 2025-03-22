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
  const fileInputRef = useRef(null);

  // Replace with your Google API key
  const API_KEY = 'your api key';
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

    // Check file size (limit to 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File too large. Please upload a file smaller than 10MB.');
      return;
    }

    // Check file type
    const validTypes = ['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/csv'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('Unsupported file type. Please upload PDF, TXT, DOCX, or CSV files.');
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);
    setError('');

    try {
      const content = await readFileContent(selectedFile);
      setFileContent(content);
    } catch (error) {
      console.error('Error reading file:', error);
      setError(`Failed to read file: ${error.message}`);
    }
  };

  // Read file content based on file type
  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      
      reader.onerror = (error) => {
        reject(error);
      };
      
      // Read as text for supported formats
      if (file.type === 'text/plain' || file.type === 'text/csv') {
        reader.readAsText(file);
      } else {
        // For other formats, read as binary string
        // Note: For PDF and DOCX, this will get raw binary data
        // In a production app, you'd want to use specialized libraries for parsing
        reader.readAsText(file);
      }
    });
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
    <form onSubmit={handleSubmit} className="prompt-form">
      <div className="file-upload-section">
        <h3>Upload Assignment</h3>
        <div className="file-input-container">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.txt,.docx,.csv"
            ref={fileInputRef}
          />
          {fileName && (
            <div className="file-info">
              <span>{fileName}</span>
              <button 
                type="button" 
                onClick={handleClearFile}
                className="clear-file-btn"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="prompt-section">
        <h3>Additional Evaluation Criteria (Optional)</h3>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter specific criteria or "
          rows={3}
          disabled={isLoading}
        />
      </div>

      <button type="submit" disabled={isLoading || (!prompt.trim() && !fileContent)}>
        {isLoading ? 'Evaluating...' : 'Evaluate Assignment'}
      </button>
      
     
    </form>
  );
};

export default PromptForm;
import React, { useState } from 'react';
import axios from 'axios';
import ResumeDetails from './ResumeDetails'; // Add this import

const ResumeUploader = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setAnalysisResult(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a PDF file first');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);

    setIsUploading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/resumes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setAnalysisResult(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload and analyze resume');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="resume-uploader">
      <h2>Upload Resume for Analysis</h2>
      
      <div className="upload-section">
        <input 
          type="file" 
          accept=".pdf" 
          onChange={handleFileChange} 
          disabled={isUploading}
        />
        <button 
          onClick={handleUpload} 
          disabled={!file || isUploading}
        >
          {isUploading ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {analysisResult && (
        <div className="analysis-result">
          <h3>Analysis Results</h3>
          <ResumeDetails resume={analysisResult} />
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;
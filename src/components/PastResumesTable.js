import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PastResumesTable = ({ onViewDetails, onDelete }) => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/resumes');
      setResumes(response.data);
    } catch (err) {
      setError('Failed to fetch resumes');
      console.error('Error fetching resumes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume analysis? This action cannot be undone.')) {
      return;
    }

    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:5000/api/resumes/${id}`);
      
      // Remove the deleted resume from the local state
      setResumes(resumes.filter(resume => resume.id !== id));
      
      // Show success message
      alert('Resume analysis deleted successfully!');
      
      // Optional: Call parent callback if provided
      if (onDelete) {
        onDelete(id);
      }
    } catch (err) {
      console.error('Error deleting resume:', err);
      alert('Failed to delete resume analysis. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="past-resumes">
      <h2>Previously Analyzed Resumes</h2>
      
      {resumes.length === 0 ? (
        <p>No resumes analyzed yet.</p>
      ) : (
        <table className="resumes-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Name</th>
              <th>Email</th>
              <th>Rating</th>
              <th>Uploaded At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resumes.map((resume) => (
              <tr key={resume.id}>
                <td>{resume.file_name}</td>
                <td>{resume.name || 'N/A'}</td>
                <td>{resume.email || 'N/A'}</td>
                <td>{resume.resume_rating ? `${resume.resume_rating}/10` : 'N/A'}</td>
                <td>{new Date(resume.uploaded_at).toLocaleString()}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      onClick={() => onViewDetails(resume)}
                      className="details-button"
                    >
                      Details
                    </button>
                    <button 
                      onClick={() => handleDelete(resume.id)}
                      className="delete-button"
                      disabled={deletingId === resume.id}
                    >
                      {deletingId === resume.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PastResumesTable;
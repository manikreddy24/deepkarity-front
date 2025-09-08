import React, { useState } from 'react';
import ResumeUploader from './components/ResumeUploader';
import PastResumesTable from './components/PastResumesTable';
import ResumeDetails from './components/ResumeDetails';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedResume, setSelectedResume] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openResumeDetails = (resume) => {
    setSelectedResume(resume);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedResume(null);
  };
  // Add this function to your App component
const handleDeleteResume = (deletedId) => {
  console.log(`Resume ${deletedId} was deleted`);
  // You can add additional logic here if needed, like:
  // - Showing a toast notification
  // - Refreshing the resume list
  // - Updating state if needed
};

// Update the PastResumesTable usage:
{activeTab === 'history' && (
  <PastResumesTable 
    onViewDetails={openResumeDetails} 
    onDelete={handleDeleteResume}
  />
)}

  return (
    <div className="App">
      <header className="App-header">
        <h1>Resume Analyzer</h1>
      </header>
      
      <nav className="tabs">
        <button 
          className={activeTab === 'upload' ? 'active' : ''} 
          onClick={() => setActiveTab('upload')}
        >
          Resume Analysis
        </button>
        <button 
          className={activeTab === 'history' ? 'active' : ''} 
          onClick={() => setActiveTab('history')}
        >
          Historical Viewer
        </button>
      </nav>
      
      <main className="main-content">
        {activeTab === 'upload' && <ResumeUploader />}
        {activeTab === 'history' && (
          <PastResumesTable onViewDetails={openResumeDetails} />
        )}
      </main>
      
      {showModal && selectedResume && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>×</button>
            <ResumeDetails resume={selectedResume} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
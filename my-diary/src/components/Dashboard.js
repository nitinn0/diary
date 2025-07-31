import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);

  // AI Models available for different user roles
  const aiModels = {
    free: [
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast and efficient' }
    ],
    premium: [
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast and efficient' },
      { id: 'gpt-4', name: 'GPT-4', description: 'More advanced reasoning' }
    ],
    pro: [
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast and efficient' },
      { id: 'gpt-4', name: 'GPT-4', description: 'More advanced reasoning' },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', description: 'Latest and most powerful' },
      { id: 'claude-3', name: 'Claude 3', description: 'Creative and analytical' }
    ]
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/notes/my');
      setNotes(response.data);
    } catch (error) {
      setError('Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      const response = await axios.post('/notes/create', { content: newNote });
      setNotes([response.data, ...notes]);
      setNewNote('');
    } catch (error) {
      setError('Failed to create note');
    }
  };

  const handleUpdateNote = async (noteId) => {
    if (!editContent.trim()) return;

    try {
      const response = await axios.put(`/notes/${noteId}`, { content: editContent });
      setNotes(notes.map(note => note._id === noteId ? response.data : note));
      setEditingNote(null);
      setEditContent('');
    } catch (error) {
      setError('Failed to update note');
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    try {
      await axios.delete(`/notes/${noteId}`);
      setNotes(notes.filter(note => note._id !== noteId));
    } catch (error) {
      setError('Failed to delete note');
    }
  };

  const handleAIGenerate = async () => {
    if (user.role === 'free') {
      setError('Upgrade to premium or pro to use AI generation');
      return;
    }

    try {
      setAiGenerating(true);
      setError('');
      
      const response = await axios.post('/notes/ai-generate', { model: selectedModel });
      setNewNote(response.data.content);
      setShowModelSelector(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to generate AI note');
    } finally {
      setAiGenerating(false);
    }
  };

  const startEditing = (note) => {
    setEditingNote(note._id);
    setEditContent(note.content);
  };

  const cancelEditing = () => {
    setEditingNote(null);
    setEditContent('');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAvailableModels = () => {
    return aiModels[user.role] || aiModels.free;
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Your Personal Diary</h2>
        <p>Write your thoughts, memories, and experiences</p>
        {user.role !== 'free' && (
          <div className="user-plan-badge">
            <span className={`plan-badge ${user.role}`}>
              {user.role.toUpperCase()} PLAN
            </span>
          </div>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="note-form-container">
        <form onSubmit={handleCreateNote} className="note-form">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write your diary entry here..."
            className="note-textarea"
            rows="4"
          />
          <div className="note-form-actions">
            <button type="submit" className="btn-primary" disabled={!newNote.trim()}>
              Save Entry
            </button>
            {user.role !== 'free' && (
              <div className="ai-actions">
                <button 
                  type="button" 
                  onClick={() => setShowModelSelector(!showModelSelector)}
                  className="btn-secondary"
                >
                  🤖 AI Generate
                </button>
                {showModelSelector && (
                  <div className="model-selector">
                    <div className="model-selector-header">
                      <h4>Choose AI Model</h4>
                      <button 
                        type="button" 
                        onClick={() => setShowModelSelector(false)}
                        className="close-btn"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="model-list">
                      {getAvailableModels().map(model => (
                        <div 
                          key={model.id} 
                          className={`model-option ${selectedModel === model.id ? 'selected' : ''}`}
                          onClick={() => setSelectedModel(model.id)}
                        >
                          <div className="model-info">
                            <div className="model-name">{model.name}</div>
                            <div className="model-description">{model.description}</div>
                          </div>
                          {selectedModel === model.id && <span className="checkmark">✓</span>}
                        </div>
                      ))}
                    </div>
                    <button 
                      type="button" 
                      onClick={handleAIGenerate}
                      className="btn-primary generate-btn"
                      disabled={aiGenerating}
                    >
                      {aiGenerating ? 'Generating...' : 'Generate with Selected Model'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="notes-container">
        <h3>Your Entries ({notes.length})</h3>
        
        {loading ? (
          <div className="loading">Loading your entries...</div>
        ) : notes.length === 0 ? (
          <div className="empty-state">
            <p>No diary entries yet. Start writing your first entry!</p>
            {user.role === 'free' && (
              <div className="upgrade-prompt">
                <p>💡 Upgrade to Premium or Pro to unlock AI-powered diary generation!</p>
              </div>
            )}
          </div>
        ) : (
          <div className="notes-list">
            {notes.map(note => (
              <div key={note._id} className="note-card">
                {editingNote === note._id ? (
                  <div className="note-edit">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="note-edit-textarea"
                      rows="4"
                    />
                    <div className="note-edit-actions">
                      <button 
                        onClick={() => handleUpdateNote(note._id)}
                        className="btn-primary"
                        disabled={!editContent.trim()}
                      >
                        Save
                      </button>
                      <button onClick={cancelEditing} className="btn-secondary">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="note-content">{note.content}</div>
                    <div className="note-footer">
                      <span className="note-date">{formatDate(note.createdAt)}</span>
                      <div className="note-actions">
                        <button 
                          onClick={() => startEditing(note)}
                          className="btn-icon"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => handleDeleteNote(note._id)}
                          className="btn-icon"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 
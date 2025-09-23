import React, { useState } from 'react';

const FeedbackForm = () => {
  const [feedbackType, setFeedbackType] = useState('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    priority: 'medium',
    message: '',
    rating: 0,
    anonymous: false,
    followUp: true
  });
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const feedbackTypes = [
    { id: 'general', label: 'General Feedback', icon: '💬' },
    { id: 'bug', label: 'Bug Report', icon: '🐛' },
    { id: 'feature', label: 'Feature Request', icon: '✨' },
    { id: 'improvement', label: 'Improvement Suggestion', icon: '📈' },
    { id: 'complaint', label: 'Complaint', icon: '😞' },
    { id: 'compliment', label: 'Compliment', icon: '👍' }
  ];

  const categories = [
    'Website Functionality',
    'Appointment Booking',
    'Billing & Payments',
    'Medical Records',
    'Video Consultations',
    'Customer Service',
    'Mobile App',
    'Account Management',
    'Technical Issues',
    'Other'
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'priority-low' },
    { value: 'medium', label: 'Medium', color: 'priority-medium' },
    { value: 'high', label: 'High', color: 'priority-high' },
    { value: 'critical', label: 'Critical', color: 'priority-critical' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }));
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeAttachment = (id) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          category: '',
          priority: 'medium',
          message: '',
          rating: 0,
          anonymous: false,
          followUp: true
        });
        setAttachments([]);
        setFeedbackType('general');
      }, 3000);
    }, 2000);
  };

  const handleRatingClick = (rating) => {
    handleInputChange('rating', rating);
  };

  if (isSubmitted) {
    return (
      <div className="feedback-success">
        <div className="success-icon">✅</div>
        <h3>Thank you for your feedback!</h3>
        <p>We've received your submission and will review it shortly.</p>
        <div className="success-details">
          <p><strong>Reference ID:</strong> FB-{Date.now().toString().slice(-6)}</p>
          <p><strong>Expected Response:</strong> Within 24-48 hours</p>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-form">
      <div className="feedback-header">
        <h2>Share Your Feedback</h2>
        <p>Help us improve our services by sharing your thoughts and suggestions</p>
      </div>

      <div className="feedback-types">
        {feedbackTypes.map(type => (
          <button
            key={type.id}
            className={`feedback-type-btn ${feedbackType === type.id ? 'active' : ''}`}
            onClick={() => setFeedbackType(type.id)}
          >
            <span className="type-icon">{type.icon}</span>
            <span className="type-label">{type.label}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="feedback-form-content">
        <div className="form-section">
          <h3>Contact Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">
                Name {!formData.anonymous && <span className="required">*</span>}
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Your full name"
                required={!formData.anonymous}
                disabled={formData.anonymous}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                Email {!formData.anonymous && <span className="required">*</span>}
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
                required={!formData.anonymous}
                disabled={formData.anonymous}
              />
            </div>
          </div>
          
          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.anonymous}
                onChange={(e) => handleInputChange('anonymous', e.target.checked)}
              />
              <span className="checkbox-text">Submit anonymously</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.followUp}
                onChange={(e) => handleInputChange('followUp', e.target.checked)}
                disabled={formData.anonymous}
              />
              <span className="checkbox-text">I'd like a follow-up response</span>
            </label>
          </div>
        </div>

        <div className="form-section">
          <h3>Feedback Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category <span className="required">*</span></label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
              >
                {priorities.map(priority => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject <span className="required">*</span></label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              placeholder="Brief summary of your feedback"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message <span className="required">*</span></label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Please provide detailed information about your feedback..."
              rows="6"
              required
            />
            <div className="character-count">
              {formData.message.length}/1000 characters
            </div>
          </div>
        </div>

        {(feedbackType === 'general' || feedbackType === 'compliment' || feedbackType === 'complaint') && (
          <div className="form-section">
            <h3>Rate Your Experience</h3>
            <div className="rating-section">
              <p>How would you rate your overall experience?</p>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    className={`star ${formData.rating >= star ? 'active' : ''}`}
                    onClick={() => handleRatingClick(star)}
                  >
                    ⭐
                  </button>
                ))}
              </div>
              <div className="rating-labels">
                <span>Poor</span>
                <span>Excellent</span>
              </div>
            </div>
          </div>
        )}

        <div className="form-section">
          <h3>Attachments (Optional)</h3>
          <div className="file-upload-section">
            <input
              type="file"
              id="attachments"
              multiple
              onChange={handleFileUpload}
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.txt"
              style={{ display: 'none' }}
            />
            <label htmlFor="attachments" className="file-upload-btn">
              <span className="upload-icon">📎</span>
              Add Files
            </label>
            <small className="file-help">
              Supported formats: JPG, PNG, PDF, DOC, TXT (Max: 5MB each)
            </small>
          </div>

          {attachments.length > 0 && (
            <div className="attachments-list">
              {attachments.map(attachment => (
                <div key={attachment.id} className="attachment-item">
                  <div className="attachment-info">
                    <span className="attachment-icon">📄</span>
                    <div className="attachment-details">
                      <span className="attachment-name">{attachment.name}</span>
                      <span className="attachment-size">{formatFileSize(attachment.size)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="remove-attachment"
                    onClick={() => removeAttachment(attachment.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="submit-feedback-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading-spinner"></span>
                Submitting...
              </>
            ) : (
              <>
                <span className="submit-icon">📤</span>
                Submit Feedback
              </>
            )}
          </button>
          
          <button
            type="button"
            className="save-draft-btn"
            disabled={isSubmitting}
          >
            💾 Save Draft
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
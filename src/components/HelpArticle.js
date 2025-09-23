import React, { useState, useEffect } from 'react';

const HelpArticle = ({ articleId, onClose }) => {
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [isHelpful, setIsHelpful] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const articlesData = [
    {
      id: 1,
      title: 'How to Book Your First Appointment',
      category: 'Getting Started',
      readTime: '5 min read',
      lastUpdated: '2025-01-15',
      author: 'Support Team',
      content: `
        <h2>Booking Your First Appointment</h2>
        <p>Welcome to our patient portal! Booking your first appointment is easy and can be done entirely online. Follow these simple steps to schedule your visit with one of our healthcare providers.</p>
        
        <h3>Step 1: Access the Appointments Section</h3>
        <p>From your dashboard, navigate to the "Appointments" section in the main menu. You'll see a calendar view of available appointment slots.</p>
        
        <h3>Step 2: Choose Your Healthcare Provider</h3>
        <p>Select from our list of available doctors and specialists. You can filter by:</p>
        <ul>
          <li>Specialty (General Medicine, Cardiology, Dermatology, etc.)</li>
          <li>Location (Main Center, Downtown Clinic, Specialty Center)</li>
          <li>Availability (Today, This Week, Next Week)</li>
          <li>Insurance acceptance</li>
        </ul>
        
        <h3>Step 3: Select Date and Time</h3>
        <p>Choose your preferred date and time from the available slots. Green slots indicate availability, while gray slots are already booked.</p>
        
        <h3>Step 4: Provide Appointment Details</h3>
        <p>Fill in the required information:</p>
        <ul>
          <li>Reason for visit</li>
          <li>Preferred communication method</li>
          <li>Special accommodations needed</li>
          <li>Insurance information</li>
        </ul>
        
        <h3>Step 5: Confirm Your Appointment</h3>
        <p>Review all details and confirm your appointment. You'll receive an email confirmation with:</p>
        <ul>
          <li>Appointment details</li>
          <li>Location and directions</li>
          <li>Preparation instructions</li>
          <li>Contact information</li>
        </ul>
        
        <div class="info-box">
          <strong>💡 Pro Tip:</strong> Book appointments at least 24 hours in advance for the best availability. Same-day appointments may be limited.
        </div>
        
        <h3>What to Expect</h3>
        <p>After booking your appointment, you can:</p>
        <ul>
          <li>View appointment details in your dashboard</li>
          <li>Receive reminder notifications</li>
          <li>Reschedule or cancel if needed</li>
          <li>Complete pre-visit forms online</li>
        </ul>
      `,
      tags: ['appointment', 'booking', 'first-time', 'getting-started'],
      helpful: 142,
      notHelpful: 8,
      views: 1250
    }
  ];

  useEffect(() => {
    // Simulate loading article data
    const foundArticle = articlesData.find(a => a.id === articleId);
    if (foundArticle) {
      setArticle(foundArticle);
      
      // Simulate related articles
      setRelatedArticles([
        { id: 2, title: 'Canceling or Rescheduling Appointments', category: 'Appointments' },
        { id: 3, title: 'Preparing for Your Visit', category: 'Getting Started' },
        { id: 4, title: 'Understanding Insurance Coverage', category: 'Billing' }
      ]);
    }
  }, [articleId]);

  const handleHelpfulClick = (helpful) => {
    setIsHelpful(helpful);
    if (!helpful) {
      setShowFeedback(true);
    }
  };

  const handleFeedbackSubmit = (feedback) => {
    console.log('Feedback submitted:', feedback);
    setShowFeedback(false);
  };

  if (!article) {
    return (
      <div className="article-loading">
        <div className="loading-spinner"></div>
        <p>Loading article...</p>
      </div>
    );
  }

  return (
    <div className="help-article">
      <div className="article-header">
        <div className="article-navigation">
          <button className="back-btn" onClick={onClose}>
            ← Back to Help
          </button>
          <div className="article-actions">
            <button className="print-btn" title="Print Article">🖨️</button>
            <button className="share-btn" title="Share Article">🔗</button>
            <button className="bookmark-btn" title="Bookmark">🔖</button>
          </div>
        </div>
        
        <div className="article-meta">
          <div className="article-category">{article.category}</div>
          <h1 className="article-title">{article.title}</h1>
          <div className="article-info">
            <span className="read-time">📖 {article.readTime}</span>
            <span className="last-updated">📅 Updated {article.lastUpdated}</span>
            <span className="author">👤 {article.author}</span>
            <span className="views">👁️ {article.views} views</span>
          </div>
        </div>
      </div>

      <div className="article-content">
        <div className="article-body">
          <div 
            className="content-html"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        <div className="article-sidebar">
          <div className="article-toc">
            <h4>Table of Contents</h4>
            <ul className="toc-list">
              <li><a href="#step-1">Access Appointments Section</a></li>
              <li><a href="#step-2">Choose Healthcare Provider</a></li>
              <li><a href="#step-3">Select Date and Time</a></li>
              <li><a href="#step-4">Provide Details</a></li>
              <li><a href="#step-5">Confirm Appointment</a></li>
              <li><a href="#what-to-expect">What to Expect</a></li>
            </ul>
          </div>

          <div className="article-tags">
            <h4>Tags</h4>
            <div className="tags-list">
              {article.tags.map((tag, index) => (
                <span key={index} className="article-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="article-footer">
        <div className="article-feedback">
          <h3>Was this article helpful?</h3>
          <div className="feedback-buttons">
            <button
              className={`feedback-btn helpful ${isHelpful === true ? 'active' : ''}`}
              onClick={() => handleHelpfulClick(true)}
            >
              👍 Yes ({article.helpful})
            </button>
            <button
              className={`feedback-btn not-helpful ${isHelpful === false ? 'active' : ''}`}
              onClick={() => handleHelpfulClick(false)}
            >
              👎 No ({article.notHelpful})
            </button>
          </div>
          
          {isHelpful === true && (
            <div className="feedback-success">
              <p>✅ Thank you for your feedback!</p>
            </div>
          )}
          
          {showFeedback && (
            <div className="feedback-form">
              <h4>How can we improve this article?</h4>
              <textarea
                placeholder="Please tell us what information was missing or unclear..."
                rows="3"
              />
              <div className="feedback-actions">
                <button
                  className="submit-feedback"
                  onClick={() => handleFeedbackSubmit('feedback')}
                >
                  Submit Feedback
                </button>
                <button
                  className="cancel-feedback"
                  onClick={() => setShowFeedback(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="related-articles">
          <h3>Related Articles</h3>
          <div className="related-list">
            {relatedArticles.map(related => (
              <div key={related.id} className="related-article">
                <div className="related-category">{related.category}</div>
                <h4 className="related-title">{related.title}</h4>
                <button className="read-article-btn">Read Article →</button>
              </div>
            ))}
          </div>
        </div>

        <div className="article-contact">
          <div className="contact-card">
            <h4>Still need help?</h4>
            <p>Can't find what you're looking for? Our support team is here to help.</p>
            <div className="contact-options">
              <button className="contact-btn primary">💬 Start Live Chat</button>
              <button className="contact-btn secondary">📧 Contact Support</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpArticle;
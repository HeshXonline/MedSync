import React, { useState } from 'react';
import FAQAccordion from '../components/FAQAccordion';
import HelpArticle from '../components/HelpArticle';
import LiveChat from '../components/LiveChat';
import TicketSystem from '../components/TicketSystem';
import VideoLibrary from '../components/VideoLibrary';
import ContactInfo from '../components/ContactInfo';
import FeedbackForm from '../components/FeedbackForm';
import SearchInterface from '../components/SearchInterface';
import '../styles/SupportHelp.css';

const SupportHelp = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatOpen, setChatOpen] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'faq', label: 'FAQ', icon: '❓' },
    { id: 'tutorials', label: 'Tutorials', icon: '🎥' },
    { id: 'feedback', label: 'Feedback', icon: '💬' }
  ];

  const popularTopics = [
    {
      title: 'Getting Started',
      articles: [
        { title: 'New Patient Guide', description: 'Complete guide for first-time patients', icon: '📄' },
        { title: 'Video Tutorials', description: 'Watch step-by-step video guides', icon: '🎬' }
      ]
    },
    {
      title: 'Account Management',
      articles: [
        { title: 'Profile Settings', description: 'Update your personal information', icon: '👤' },
        { title: 'Billing & Payments', description: 'Manage your payment methods', icon: '💳' }
      ]
    },
    {
      title: 'Appointments',
      articles: [
        { title: 'Booking Appointments', description: 'Schedule your medical appointments', icon: '📅' },
        { title: 'Cancellation Policy', description: 'Learn about our cancellation terms', icon: '🚫' }
      ]
    }
  ];

  const systemStatus = {
    overall: 'Operational',
    services: [
      { name: 'Patient Portal', status: 'Operational', uptime: '99.9%' },
      { name: 'Appointment System', status: 'Operational', uptime: '99.8%' },
      { name: 'Billing System', status: 'Maintenance', uptime: '98.5%' },
      { name: 'Video Calls', status: 'Operational', uptime: '99.7%' }
    ]
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="overview-content">
            <div className="quick-help-section">
              <h2>Quick Help</h2>
              <div className="quick-help-grid">
                <div className="help-card">
                  <div className="help-icon">📞</div>
                  <h3>Phone Support</h3>
                  <p>+94 11 234 5678</p>
                  <small>Mon-Fri 8AM-6PM</small>
                </div>
                <div className="help-card">
                  <div className="help-icon">💬</div>
                  <h3>Live Chat</h3>
                  <button 
                    className="chat-button"
                    onClick={() => setChatOpen(true)}
                  >
                    Start Chat
                  </button>
                </div>
                <div className="help-card">
                  <div className="help-icon">🎫</div>
                  <h3>Submit Ticket</h3>
                  <button 
                    className="ticket-button"
                    onClick={() => setActiveTab('feedback')}
                  >
                    Create Ticket
                  </button>
                </div>
              </div>
            </div>

            <div className="popular-topics-section">
              <h2>Popular Topics</h2>
              <div className="topics-grid">
                {popularTopics.map((topic, index) => (
                  <div key={index} className="topic-category">
                    <h3>{topic.title}</h3>
                    <div className="topic-articles">
                      {topic.articles.map((article, articleIndex) => (
                        <div key={articleIndex} className="topic-article">
                          <span className="article-icon">{article.icon}</span>
                          <div className="article-content">
                            <h4>{article.title}</h4>
                            <p>{article.description}</p>
                          </div>
                          <button className="read-more-btn">Read More</button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="system-status-section">
              <h2>System Status</h2>
              <div className="status-overview">
                <div className="overall-status">
                  <span className={`status-indicator ${systemStatus.overall.toLowerCase()}`}></span>
                  <span className="status-text">Overall Status: {systemStatus.overall}</span>
                </div>
                <div className="services-status">
                  {systemStatus.services.map((service, index) => (
                    <div key={index} className="service-status">
                      <div className="service-info">
                        <span className="service-name">{service.name}</span>
                        <span className={`service-status-badge ${service.status.toLowerCase()}`}>
                          {service.status}
                        </span>
                      </div>
                      <span className="service-uptime">{service.uptime} uptime</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <ContactInfo />
          </div>
        );
      case 'faq':
        return <FAQAccordion searchQuery={searchQuery} />;
      case 'tutorials':
        return <VideoLibrary searchQuery={searchQuery} />;
      case 'feedback':
        return (
          <div className="feedback-content">
            <TicketSystem />
            <FeedbackForm />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="support-help-page">
      <div className="support-header">
        <div className="header-content">
          <h1>Support & Help Center</h1>
          <p>Find answers to your questions and get the help you need</p>
        </div>
      </div>

      <div className="support-navigation">
        <div className="nav-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
        <SearchInterface 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search help articles, FAQs, and guides..."
        />
      </div>

      <div className="support-content">
        {renderTabContent()}
      </div>

      {chatOpen && (
        <LiveChat 
          isOpen={chatOpen}
          onClose={() => setChatOpen(false)}
        />
      )}
    </div>
  );
};

export default SupportHelp;
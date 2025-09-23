import React, { useState, useEffect } from 'react';

const FAQAccordion = ({ searchQuery }) => {
  const [openItems, setOpenItems] = useState(new Set());
  const [filteredFAQs, setFilteredFAQs] = useState([]);

  const faqData = [
    {
      id: 1,
      category: 'Account & Login',
      question: 'How do I reset my password?',
      answer: 'To reset your password, click on the "Forgot Password" link on the login page. Enter your email address and we\'ll send you a reset link. Follow the instructions in the email to create a new password.',
      tags: ['password', 'login', 'account']
    },
    {
      id: 2,
      category: 'Account & Login',
      question: 'How do I update my profile information?',
      answer: 'Go to your profile settings by clicking on your name in the top right corner, then select "Profile Settings". You can update your personal information, contact details, and preferences from there.',
      tags: ['profile', 'settings', 'update']
    },
    {
      id: 3,
      category: 'Appointments',
      question: 'How do I book an appointment?',
      answer: 'Navigate to the Appointments section and click "Book New Appointment". Select your preferred doctor, date, and time. You\'ll receive a confirmation email once your appointment is scheduled.',
      tags: ['appointment', 'booking', 'schedule']
    },
    {
      id: 4,
      category: 'Appointments',
      question: 'Can I cancel or reschedule my appointment?',
      answer: 'Yes, you can cancel or reschedule appointments up to 24 hours before the scheduled time. Go to "My Appointments" and click on the appointment you want to modify.',
      tags: ['cancel', 'reschedule', 'appointment']
    },
    {
      id: 5,
      category: 'Billing & Payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, and bank transfers. You can also set up automatic payments for recurring charges.',
      tags: ['payment', 'billing', 'credit card']
    },
    {
      id: 6,
      category: 'Billing & Payments',
      question: 'How do I view my billing history?',
      answer: 'Go to the Billing section in your dashboard to view all your past invoices, payment history, and outstanding balances. You can also download PDF copies of your bills.',
      tags: ['billing', 'history', 'invoice']
    },
    {
      id: 7,
      category: 'Technical Issues',
      question: 'I\'m having trouble with video calls. What should I do?',
      answer: 'First, check your internet connection and ensure your browser allows camera and microphone access. Try refreshing the page or using a different browser. If issues persist, contact our technical support.',
      tags: ['video', 'technical', 'troubleshooting']
    },
    {
      id: 8,
      category: 'Medical Records',
      question: 'How can I access my medical records?',
      answer: 'Your medical records are available in the "Medical Records" section of your patient portal. You can view test results, treatment history, and download records as needed.',
      tags: ['medical records', 'history', 'documents']
    },
    {
      id: 9,
      category: 'Insurance',
      question: 'How do I add my insurance information?',
      answer: 'Go to your profile settings and select "Insurance Information". Upload photos of your insurance cards and fill in the required details. We\'ll verify your coverage within 24 hours.',
      tags: ['insurance', 'coverage', 'verification']
    },
    {
      id: 10,
      category: 'Prescriptions',
      question: 'How do I request prescription refills?',
      answer: 'In the "Prescriptions" section, find the medication you need refilled and click "Request Refill". Your doctor will review and approve the refill, then send it to your preferred pharmacy.',
      tags: ['prescription', 'refill', 'medication']
    }
  ];

  useEffect(() => {
    if (searchQuery) {
      const filtered = faqData.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        faq.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFAQs(filtered);
    } else {
      setFilteredFAQs(faqData);
    }
  }, [searchQuery]);

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index}>{part}</mark>
      ) : (
        part
      )
    );
  };

  const groupedFAQs = filteredFAQs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {});

  return (
    <div className="faq-accordion">
      <div className="faq-header">
        <h2>Frequently Asked Questions</h2>
        <p>Find quick answers to common questions</p>
      </div>

      {searchQuery && (
        <div className="search-results-info">
          <p>Found {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''} for "{searchQuery}"</p>
        </div>
      )}

      <div className="faq-categories">
        {Object.entries(groupedFAQs).map(([category, faqs]) => (
          <div key={category} className="faq-category">
            <h3 className="category-title">{category}</h3>
            <div className="faq-items">
              {faqs.map(faq => (
                <div key={faq.id} className="faq-item">
                  <button
                    className={`faq-question ${openItems.has(faq.id) ? 'active' : ''}`}
                    onClick={() => toggleItem(faq.id)}
                  >
                    <span className="question-text">
                      {highlightText(faq.question, searchQuery)}
                    </span>
                    <span className={`faq-icon ${openItems.has(faq.id) ? 'rotated' : ''}`}>
                      ▼
                    </span>
                  </button>
                  <div className={`faq-answer ${openItems.has(faq.id) ? 'open' : ''}`}>
                    <div className="answer-content">
                      <p>{highlightText(faq.answer, searchQuery)}</p>
                      <div className="faq-tags">
                        {faq.tags.map((tag, index) => (
                          <span key={index} className="faq-tag">
                            {highlightText(tag, searchQuery)}
                          </span>
                        ))}
                      </div>
                      <div className="faq-actions">
                        <button className="helpful-btn">👍 Helpful</button>
                        <button className="not-helpful-btn">👎 Not helpful</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredFAQs.length === 0 && searchQuery && (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>No results found</h3>
          <p>Try searching with different keywords or browse our categories above.</p>
          <button className="contact-support-btn">Contact Support</button>
        </div>
      )}
    </div>
  );
};

export default FAQAccordion;
import React, { useState } from 'react';

const ContactInfo = () => {
  const [selectedLocation, setSelectedLocation] = useState(0);
  const [expandedHours, setExpandedHours] = useState(false);

  const locations = [
    {
      id: 1,
      name: 'Main Medical Center',
      address: '123 Healthcare Boulevard, Colombo 03, Sri Lanka',
      phone: '+94 11 234 5678',
      email: 'main@healthcenter.lk',
      hours: {
        'Monday - Friday': '8:00 AM - 6:00 PM',
        'Saturday': '9:00 AM - 4:00 PM',
        'Sunday': '10:00 AM - 2:00 PM (Emergency only)'
      },
      services: ['General Medicine', 'Emergency Care', 'Specialist Consultations', 'Laboratory', 'Pharmacy'],
      coordinates: { lat: 6.9271, lng: 79.8612 }
    },
    {
      id: 2,
      name: 'Downtown Clinic',
      address: '456 Medical Street, Colombo 01, Sri Lanka',
      phone: '+94 11 234 5679',
      email: 'downtown@healthcenter.lk',
      hours: {
        'Monday - Friday': '7:00 AM - 8:00 PM',
        'Saturday': '8:00 AM - 5:00 PM',
        'Sunday': 'Closed'
      },
      services: ['General Practice', 'Preventive Care', 'Minor Procedures', 'Vaccinations'],
      coordinates: { lat: 6.9344, lng: 79.8428 }
    },
    {
      id: 3,
      name: 'Specialty Care Center',
      address: '789 Wellness Avenue, Colombo 07, Sri Lanka',
      phone: '+94 11 234 5680',
      email: 'specialty@healthcenter.lk',
      hours: {
        'Monday - Friday': '9:00 AM - 5:00 PM',
        'Saturday': '9:00 AM - 1:00 PM',
        'Sunday': 'Closed'
      },
      services: ['Cardiology', 'Dermatology', 'Orthopedics', 'Mental Health', 'Physical Therapy'],
      coordinates: { lat: 6.9147, lng: 79.8757 }
    }
  ];

  const supportChannels = [
    {
      name: 'Phone Support',
      icon: '📞',
      contact: '+94 11 234 5678',
      availability: 'Mon-Fri 8AM-6PM',
      description: 'Speak directly with our support team',
      action: 'Call Now',
      primary: true
    },
    {
      name: 'Live Chat',
      icon: '💬',
      contact: 'Available 24/7',
      availability: 'Always available',
      description: 'Get instant help through chat',
      action: 'Start Chat',
      primary: true
    },
    {
      name: 'Email Support',
      icon: '✉️',
      contact: 'support@healthcenter.lk',
      availability: 'Response within 24 hours',
      description: 'Send us detailed questions',
      action: 'Send Email',
      primary: false
    },
    {
      name: 'WhatsApp',
      icon: '📱',
      contact: '+94 77 123 4567',
      availability: 'Mon-Fri 9AM-5PM',
      description: 'Quick support via WhatsApp',
      action: 'Message Us',
      primary: false
    },
    {
      name: 'Video Call',
      icon: '📹',
      contact: 'Schedule appointment',
      availability: 'By appointment only',
      description: 'Face-to-face technical support',
      action: 'Schedule Call',
      primary: false
    },
    {
      name: 'Help Desk',
      icon: '🎫',
      contact: 'Submit ticket',
      availability: 'Response within 4 hours',
      description: 'Create detailed support requests',
      action: 'Create Ticket',
      primary: false
    }
  ];

  const emergencyInfo = {
    phone: '911',
    afterHours: '+94 11 234 5699',
    description: 'For medical emergencies, call 911 immediately. For non-emergency after-hours support, use our dedicated line.'
  };

  const socialMedia = [
    { name: 'Facebook', icon: '📘', url: '#', handle: '@HealthCenterLK' },
    { name: 'Twitter', icon: '🐦', url: '#', handle: '@HealthCenterLK' },
    { name: 'Instagram', icon: '📷', url: '#', handle: '@healthcenterlk' },
    { name: 'LinkedIn', icon: '💼', url: '#', handle: 'Health Center Sri Lanka' }
  ];

  const handleLocationSelect = (index) => {
    setSelectedLocation(index);
  };

  const handleContactAction = (channel) => {
    switch (channel.name) {
      case 'Phone Support':
        window.open(`tel:${channel.contact}`);
        break;
      case 'Email Support':
        window.open(`mailto:${channel.contact}`);
        break;
      case 'WhatsApp':
        window.open(`https://wa.me/${channel.contact.replace(/[^0-9]/g, '')}`);
        break;
      default:
        console.log(`Action for ${channel.name}`);
    }
  };

  return (
    <div className="contact-info">
      <div className="contact-header">
        <h2>Contact Information</h2>
        <p>Multiple ways to reach us and get the help you need</p>
      </div>

      <div className="contact-content">
        <div className="support-channels-section">
          <h3>Support Channels</h3>
          <div className="support-channels">
            {supportChannels.map((channel, index) => (
              <div 
                key={index} 
                className={`support-channel ${channel.primary ? 'primary' : 'secondary'}`}
              >
                <div className="channel-icon">{channel.icon}</div>
                <div className="channel-info">
                  <h4>{channel.name}</h4>
                  <p className="channel-contact">{channel.contact}</p>
                  <p className="channel-availability">{channel.availability}</p>
                  <p className="channel-description">{channel.description}</p>
                </div>
                <button 
                  className="channel-action"
                  onClick={() => handleContactAction(channel)}
                >
                  {channel.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="emergency-section">
          <div className="emergency-banner">
            <div className="emergency-icon">🚨</div>
            <div className="emergency-content">
              <h3>Emergency Contact</h3>
              <div className="emergency-numbers">
                <div className="emergency-primary">
                  <span className="emergency-label">Emergency:</span>
                  <span className="emergency-number">{emergencyInfo.phone}</span>
                </div>
                <div className="emergency-secondary">
                  <span className="emergency-label">After Hours:</span>
                  <span className="emergency-number">{emergencyInfo.afterHours}</span>
                </div>
              </div>
              <p className="emergency-description">{emergencyInfo.description}</p>
            </div>
          </div>
        </div>

        <div className="locations-section">
          <h3>Our Locations</h3>
          <div className="locations-container">
            <div className="locations-tabs">
              {locations.map((location, index) => (
                <button
                  key={location.id}
                  className={`location-tab ${selectedLocation === index ? 'active' : ''}`}
                  onClick={() => handleLocationSelect(index)}
                >
                  <span className="location-icon">📍</span>
                  {location.name}
                </button>
              ))}
            </div>

            <div className="location-details">
              <div className="location-info">
                <h4>{locations[selectedLocation].name}</h4>
                <div className="location-contact">
                  <div className="contact-item">
                    <span className="contact-icon">📍</span>
                    <span className="contact-text">{locations[selectedLocation].address}</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📞</span>
                    <span className="contact-text">{locations[selectedLocation].phone}</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">✉️</span>
                    <span className="contact-text">{locations[selectedLocation].email}</span>
                  </div>
                </div>

                <div className="location-hours">
                  <h5>
                    Operating Hours
                    <button 
                      className="expand-hours"
                      onClick={() => setExpandedHours(!expandedHours)}
                    >
                      {expandedHours ? '▼' : '▶'}
                    </button>
                  </h5>
                  {expandedHours && (
                    <div className="hours-list">
                      {Object.entries(locations[selectedLocation].hours).map(([day, hours]) => (
                        <div key={day} className="hours-item">
                          <span className="hours-day">{day}:</span>
                          <span className="hours-time">{hours}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="location-services">
                  <h5>Available Services</h5>
                  <div className="services-list">
                    {locations[selectedLocation].services.map((service, index) => (
                      <span key={index} className="service-tag">{service}</span>
                    ))}
                  </div>
                </div>

                <div className="location-actions">
                  <button className="location-btn primary">Get Directions</button>
                  <button className="location-btn secondary">Call Location</button>
                </div>
              </div>

              <div className="location-map">
                <div className="map-placeholder">
                  <div className="map-icon">🗺️</div>
                  <p>Interactive Map</p>
                  <small>Click to view in maps</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="additional-info">
          <div className="social-media-section">
            <h3>Follow Us</h3>
            <div className="social-media-links">
              {socialMedia.map((social, index) => (
                <a 
                  key={index} 
                  href={social.url} 
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="social-icon">{social.icon}</span>
                  <div className="social-info">
                    <span className="social-name">{social.name}</span>
                    <span className="social-handle">{social.handle}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="business-hours-summary">
            <h3>General Business Hours</h3>
            <div className="hours-summary">
              <div className="hours-item">
                <span className="hours-label">Weekdays:</span>
                <span className="hours-value">8:00 AM - 6:00 PM</span>
              </div>
              <div className="hours-item">
                <span className="hours-label">Weekends:</span>
                <span className="hours-value">9:00 AM - 4:00 PM</span>
              </div>
              <div className="hours-item">
                <span className="hours-label">Holidays:</span>
                <span className="hours-value">Emergency services only</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
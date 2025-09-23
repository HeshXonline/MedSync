import React, { useState, useEffect, useRef } from 'react';

const LiveChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'agent',
      message: 'Hello! I\'m Sarah from customer support. How can I help you today?',
      timestamp: new Date(),
      avatar: '👩‍💼'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAgentOnline, setIsAgentOnline] = useState(true);
  const [chatStatus, setChatStatus] = useState('connected'); // connected, waiting, offline
  const messagesEndRef = useRef(null);

  const quickReplies = [
    'I need help with booking an appointment',
    'I have a billing question',
    'Technical support needed',
    'I want to update my profile'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (messageText = newMessage) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      message: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      const responses = [
        'I understand your concern. Let me help you with that.',
        'Thank you for that information. I\'m looking into this for you.',
        'I can definitely assist you with that. One moment please.',
        'That\'s a great question! Let me provide you with the details.',
        'I\'ll need to check your account details. Please hold on.'
      ];

      const agentMessage = {
        id: messages.length + 2,
        sender: 'agent',
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        avatar: '👩‍💼'
      };

      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleQuickReply = (reply) => {
    handleSendMessage(reply);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="live-chat-overlay">
      <div className="live-chat-container">
        <div className="chat-header">
          <div className="agent-info">
            <div className="agent-avatar">👩‍💼</div>
            <div className="agent-details">
              <h4>Sarah Johnson</h4>
              <div className="agent-status">
                <span className={`status-dot ${isAgentOnline ? 'online' : 'offline'}`}></span>
                <span className="status-text">
                  {isAgentOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>
          <div className="chat-controls">
            <button className="minimize-btn" title="Minimize">−</button>
            <button className="close-btn" onClick={onClose} title="Close">×</button>
          </div>
        </div>

        <div className="chat-status-bar">
          <span className={`chat-status ${chatStatus}`}>
            {chatStatus === 'connected' && '🟢 Connected'}
            {chatStatus === 'waiting' && '🟡 Waiting for agent...'}
            {chatStatus === 'offline' && '🔴 Currently offline'}
          </span>
          <span className="response-time">Avg. response: 2 min</span>
        </div>

        <div className="chat-messages">
          {messages.map(message => (
            <div key={message.id} className={`message ${message.sender}`}>
              {message.sender === 'agent' && (
                <div className="message-avatar">{message.avatar}</div>
              )}
              <div className="message-content">
                <div className="message-bubble">
                  <p>{message.message}</p>
                </div>
                <div className="message-time">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message agent typing">
              <div className="message-avatar">👩‍💼</div>
              <div className="message-content">
                <div className="message-bubble">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="quick-replies">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              className="quick-reply-btn"
              onClick={() => handleQuickReply(reply)}
            >
              {reply}
            </button>
          ))}
        </div>

        <div className="chat-input-container">
          <div className="chat-input-wrapper">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="chat-input"
              rows="1"
            />
            <button
              onClick={() => handleSendMessage()}
              className="send-btn"
              disabled={!newMessage.trim()}
            >
              <span className="send-icon">➤</span>
            </button>
          </div>
          <div className="chat-footer">
            <span className="powered-by">Powered by LiveSupport</span>
            <div className="file-upload">
              <button className="attachment-btn" title="Attach file">📎</button>
              <button className="emoji-btn" title="Add emoji">😊</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
import React, { useState } from 'react';

const TicketSystem = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [tickets, setTickets] = useState([
    {
      id: 'TK-001',
      subject: 'Unable to book appointment',
      category: 'Technical',
      priority: 'High',
      status: 'Open',
      created: '2025-01-15',
      lastUpdate: '2025-01-16',
      assignedTo: 'John Smith',
      description: 'I am unable to select a date when trying to book an appointment. The calendar widget is not responding.',
      responses: [
        {
          id: 1,
          author: 'Support Team',
          message: 'Thank you for reporting this issue. We are investigating the calendar widget problem.',
          timestamp: '2025-01-15 10:30 AM',
          type: 'support'
        },
        {
          id: 2,
          author: 'You',
          message: 'The issue is still persisting. I tried different browsers but the problem remains.',
          timestamp: '2025-01-16 09:15 AM',
          type: 'user'
        }
      ]
    },
    {
      id: 'TK-002',
      subject: 'Billing inquiry - duplicate charge',
      category: 'Billing',
      priority: 'Medium',
      status: 'In Progress',
      created: '2025-01-10',
      lastUpdate: '2025-01-14',
      assignedTo: 'Sarah Johnson',
      description: 'I noticed a duplicate charge on my account for the same appointment.',
      responses: [
        {
          id: 1,
          author: 'Billing Team',
          message: 'We have identified the duplicate charge and are processing a refund.',
          timestamp: '2025-01-12 02:45 PM',
          type: 'support'
        }
      ]
    },
    {
      id: 'TK-003',
      subject: 'Password reset not working',
      category: 'Account',
      priority: 'Low',
      status: 'Resolved',
      created: '2025-01-08',
      lastUpdate: '2025-01-09',
      assignedTo: 'Mike Davis',
      description: 'Password reset email is not being received.',
      responses: [
        {
          id: 1,
          author: 'Support Team',
          message: 'The issue was caused by emails going to spam. This has been resolved.',
          timestamp: '2025-01-09 11:20 AM',
          type: 'support'
        }
      ]
    }
  ]);

  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: '',
    priority: 'Medium',
    description: '',
    attachments: []
  });

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newResponse, setNewResponse] = useState('');

  const categories = [
    'Technical Support',
    'Billing & Payments',
    'Account Issues',
    'Appointments',
    'Medical Records',
    'Insurance',
    'General Inquiry'
  ];

  const priorities = ['Low', 'Medium', 'High', 'Critical'];

  const handleCreateTicket = (e) => {
    e.preventDefault();
    const ticket = {
      id: `TK-${String(tickets.length + 1).padStart(3, '0')}`,
      ...newTicket,
      status: 'Open',
      created: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0],
      assignedTo: 'Support Team',
      responses: []
    };
    
    setTickets([ticket, ...tickets]);
    setNewTicket({
      subject: '',
      category: '',
      priority: 'Medium',
      description: '',
      attachments: []
    });
    setActiveTab('view');
  };

  const handleResponseSubmit = (e) => {
    e.preventDefault();
    if (!newResponse.trim() || !selectedTicket) return;

    const response = {
      id: selectedTicket.responses.length + 1,
      author: 'You',
      message: newResponse,
      timestamp: new Date().toLocaleString(),
      type: 'user'
    };

    const updatedTickets = tickets.map(ticket =>
      ticket.id === selectedTicket.id
        ? {
            ...ticket,
            responses: [...ticket.responses, response],
            lastUpdate: new Date().toISOString().split('T')[0]
          }
        : ticket
    );

    setTickets(updatedTickets);
    setSelectedTicket({
      ...selectedTicket,
      responses: [...selectedTicket.responses, response]
    });
    setNewResponse('');
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open': return 'status-open';
      case 'in progress': return 'status-progress';
      case 'resolved': return 'status-resolved';
      case 'closed': return 'status-closed';
      default: return 'status-default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'priority-critical';
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-default';
    }
  };

  return (
    <div className="ticket-system">
      <div className="ticket-header">
        <h2>Support Tickets</h2>
        <div className="ticket-tabs">
          <button
            className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            🎫 Create Ticket
          </button>
          <button
            className={`tab-btn ${activeTab === 'view' ? 'active' : ''}`}
            onClick={() => setActiveTab('view')}
          >
            📋 My Tickets ({tickets.length})
          </button>
        </div>
      </div>

      {activeTab === 'create' && (
        <div className="create-ticket">
          <form onSubmit={handleCreateTicket} className="ticket-form">
            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                value={newTicket.subject}
                onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                placeholder="Brief description of your issue"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  value={newTicket.category}
                  onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
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
                  value={newTicket.priority}
                  onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                value={newTicket.description}
                onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                placeholder="Please provide detailed information about your issue..."
                rows="6"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="attachments">Attachments</label>
              <div className="file-upload-area">
                <input type="file" id="attachments" multiple />
                <div className="upload-placeholder">
                  <span className="upload-icon">📎</span>
                  <p>Drop files here or click to browse</p>
                  <small>Max file size: 10MB. Supported formats: PDF, PNG, JPG, DOC</small>
                </div>
              </div>
            </div>

            <button type="submit" className="submit-ticket-btn">
              Submit Ticket
            </button>
          </form>
        </div>
      )}

      {activeTab === 'view' && (
        <div className="tickets-view">
          {selectedTicket ? (
            <div className="ticket-detail">
              <div className="ticket-detail-header">
                <button 
                  className="back-btn"
                  onClick={() => setSelectedTicket(null)}
                >
                  ← Back to tickets
                </button>
                <div className="ticket-info">
                  <h3>{selectedTicket.subject}</h3>
                  <div className="ticket-meta">
                    <span className={`status-badge ${getStatusColor(selectedTicket.status)}`}>
                      {selectedTicket.status}
                    </span>
                    <span className={`priority-badge ${getPriorityColor(selectedTicket.priority)}`}>
                      {selectedTicket.priority}
                    </span>
                    <span className="ticket-id">#{selectedTicket.id}</span>
                  </div>
                </div>
              </div>

              <div className="ticket-details">
                <div className="detail-section">
                  <h4>Ticket Information</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Category:</label>
                      <span>{selectedTicket.category}</span>
                    </div>
                    <div className="detail-item">
                      <label>Created:</label>
                      <span>{selectedTicket.created}</span>
                    </div>
                    <div className="detail-item">
                      <label>Last Update:</label>
                      <span>{selectedTicket.lastUpdate}</span>
                    </div>
                    <div className="detail-item">
                      <label>Assigned to:</label>
                      <span>{selectedTicket.assignedTo}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Description</h4>
                  <p className="ticket-description">{selectedTicket.description}</p>
                </div>

                <div className="detail-section">
                  <h4>Conversation</h4>
                  <div className="ticket-responses">
                    {selectedTicket.responses.map(response => (
                      <div key={response.id} className={`response ${response.type}`}>
                        <div className="response-header">
                          <span className="response-author">{response.author}</span>
                          <span className="response-time">{response.timestamp}</span>
                        </div>
                        <div className="response-message">{response.message}</div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleResponseSubmit} className="response-form">
                    <textarea
                      value={newResponse}
                      onChange={(e) => setNewResponse(e.target.value)}
                      placeholder="Add a response..."
                      rows="3"
                    />
                    <button type="submit" disabled={!newResponse.trim()}>
                      Send Response
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="tickets-list">
              <div className="tickets-filter">
                <select className="filter-select">
                  <option value="">All statuses</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
                <select className="filter-select">
                  <option value="">All priorities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div className="tickets-table">
                {tickets.map(ticket => (
                  <div 
                    key={ticket.id} 
                    className="ticket-row"
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <div className="ticket-main">
                      <div className="ticket-title">
                        <h4>{ticket.subject}</h4>
                        <span className="ticket-id">#{ticket.id}</span>
                      </div>
                      <div className="ticket-badges">
                        <span className={`status-badge ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                        <span className={`priority-badge ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                        <span className="category-badge">{ticket.category}</span>
                      </div>
                    </div>
                    <div className="ticket-meta">
                      <span className="created-date">Created: {ticket.created}</span>
                      <span className="last-update">Updated: {ticket.lastUpdate}</span>
                      <span className="assigned-to">Assigned: {ticket.assignedTo}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TicketSystem;
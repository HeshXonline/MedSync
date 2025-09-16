import React from 'react';
import { Link } from 'react-router-dom';

const NotAuthorized = () => (
  <div style={{ padding: 20 }}>
    <h1>403 - Not Authorized</h1>
    <p>You do not have permission to access this page.</p>
    <Link to="/">Return to Dashboard</Link>
  </div>
);

export default NotAuthorized;


import React from 'react';
import { ROLES } from '../roles';

const Dashboard = ({ role }) => {
  // Mock KPIs
  const kpis = {
    appointmentsToday: 15,
    revenue: 50000,
    outstanding: 10000,
  };

  return (
    <div>
      <h1>Welcome, {role}</h1>
      <div className="dashboard">
        <h2>Key Metrics</h2>
        <p>Appointments Today: {kpis.appointmentsToday}</p>
        {(role === ROLES.BILLING_STAFF || role === ROLES.SYSTEM_ADMIN) && (
          <p>Revenue: LKR {kpis.revenue}</p>
        )}
        {(role === ROLES.ADMIN_STAFF || role === ROLES.BILLING_STAFF || role === ROLES.SYSTEM_ADMIN) && (
          <p>Outstanding Balances: LKR {kpis.outstanding}</p>
        )}
        <div style={{ background: '#007bff', width: `${kpis.appointmentsToday * 5}px`, height: '20px' }} title="Appointments Chart"></div>
      </div>
    </div>
  );
};

export default Dashboard;
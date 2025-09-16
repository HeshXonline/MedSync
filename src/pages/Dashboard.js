import React from 'react';
import KPIStat from '../components/KPIStat';
import { Link } from 'react-router-dom';
import { ROLES } from '../roles';

const Dashboard = ({ role }) => {
  // Mock KPIs
  const kpis = {
    appointmentsToday: 15,
    revenue: 50000,
    outstanding: 10000,
  };

  const shortcuts = [];
  if (role === ROLES.ADMIN_STAFF) shortcuts.push({ label: 'New Appointment', path: '/appointments' }, { label: 'Register Patient', path: '/patients' });
  if (role === ROLES.DOCTOR) shortcuts.push({ label: 'Today\'s Appointments', path: '/appointments' }, { label: 'Prescriptions', path: '/treatments' });
  if (role === ROLES.BILLING_STAFF) shortcuts.push({ label: 'Collect Payment', path: '/billing' }, { label: 'Outstanding', path: '/reporting' });
  if (role === ROLES.SYSTEM_ADMIN) shortcuts.push({ label: 'User Management', path: '/' }, { label: 'Branch Settings', path: '/' });
  if (role === ROLES.PATIENT) shortcuts.push({ label: 'Book Appointment', path: '/appointments' });

  return (
    <div>
      <h1>Welcome, {role}</h1>
      <div className="kpi-grid">
        <KPIStat label="Appointments Today" value={kpis.appointmentsToday} />
        <KPIStat label="Revenue" value={`LKR ${kpis.revenue}`} />
        <KPIStat label="Outstanding" value={`LKR ${kpis.outstanding}`} />
      </div>

      <div className="card">
        <h2>Shortcuts</h2>
        <div className="shortcut-grid">
          {shortcuts.map((s) => (
            <Link key={s.label} className="shortcut" to={s.path}>{s.label}</Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { roleConfig } from '../roles';

const Layout = ({ role, branch, setBranch, onLogout }) => {
  const location = useLocation();
  const config = roleConfig[role] || { nav: [], quickActions: [] };

  const handleQuickAction = (key) => {
    if (key === 'newAppt') alert('Create New Appointment');
    else if (key === 'searchPatient') alert('Patient Search');
    else if (key === 'walkIn') alert('Register Emergency Walk-in');
    else if (key === 'startConsult') alert('Start Consultation');
    else if (key === 'prescribe') alert('Open Prescription Pad');
    else if (key === 'collectPayment') alert('Collect Payment');
    else if (key === 'submitClaim') alert('Submit Insurance Claim');
    else if (key === 'userMgmt') alert('Open User Management');
    else if (key === 'branchMgmt') alert('Open Branch Management');
    else if (key === 'bookAppt') alert('Book Appointment');
    else alert('Action');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Sidebar Navigation">
        <div className="logo">MedSync Clinic</div>
        <nav>
          <ul>
            {config.nav.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link className={isActive ? 'active' : ''} to={item.path}>{item.label}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <div className="main">
        <header className="topbar" aria-label="Top Bar">
          <div className="topbar-left">
            <span>Role: {role}</span>
            <span className="divider">|</span>
            <label htmlFor="branch-select" style={{ marginRight: 8 }}>Branch:</label>
            <select id="branch-select" value={branch} onChange={(e) => setBranch(e.target.value)} aria-label="Select Branch">
              <option>Colombo</option>
              <option>Kandy</option>
              <option>Galle</option>
            </select>
          </div>
          <div className="quick-actions" aria-label="Quick Actions">
            {config.quickActions.map((qa) => (
              <button key={qa.key} onClick={() => handleQuickAction(qa.key)} title={qa.label}>{qa.label}</button>
            ))}
          </div>
          <button onClick={onLogout}>Logout</button>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;


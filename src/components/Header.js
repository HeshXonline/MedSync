import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROLE_NAV, ROLE_QUICK_ACTIONS } from '../roles';

const Header = ({ role, branch, setBranch, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = ROLE_NAV[role] || [];
  const quickActions = ROLE_QUICK_ACTIONS[role] || [];

  const handleQuickAction = (id) => {
    switch (id) {
      case 'newAppointment':
      case 'bookAppointment':
        navigate('/appointments');
        break;
      case 'searchPatient':
        navigate('/patients');
        break;
      case 'emergency':
        alert('Emergency Walk-in');
        break;
      case 'startConsult':
        navigate('/treatments');
        break;
      case 'notesTemplate':
        alert('Opening notes template');
        break;
      case 'prescribe':
        navigate('/treatments');
        break;
      case 'generateInvoice':
        navigate('/billing');
        break;
      case 'receivePayment':
        navigate('/billing');
        break;
      case 'submitClaim':
        navigate('/billing');
        break;
      case 'viewReports':
        navigate('/reporting');
        break;
      case 'auditLog':
        alert('Opening audit log');
        break;
      case 'viewBills':
        navigate('/billing');
        break;
      default:
        break;
    }
  };

  return (
    <header aria-label="Main Navigation">
      <div className="logo">MedSync Clinic</div>
      <div>
        User: {role} | Branch:
        <select value={branch} onChange={(e) => setBranch(e.target.value)} aria-label="Select Branch">
          <option>Colombo</option>
          <option>Kandy</option>
          <option>Galle</option>
        </select>
      </div>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path} aria-current={location.pathname === item.path ? 'page' : undefined}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        Quick Actions:
        {quickActions.map((qa) => (
          <button key={qa.id} onClick={() => handleQuickAction(qa.id)} title={qa.label}>{qa.label}</button>
        ))}
      </div>
      <button onClick={onLogout}>Logout</button>
    </header>
  );
};

export default Header;
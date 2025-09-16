import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Tabs from '../components/Tabs';
import { ROLES } from '../roles';

const Patients = ({ role }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [patientData, setPatientData] = useState([]); // Mock patients
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', dob: '', gender: '', phone: '', email: '',
    emergencyName: '', emergencyNumber: '', branch: 'Colombo', insuranceProvider: '', policyNumber: ''
  });
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('Personal');

  const handleSearch = () => {
    // Mock search
    setPatientData([{ id: 1, name: 'John Doe', phone: '123456' }]);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.dob) {
      setError('Required fields missing');
      return;
    }
    // Mock register
    alert('Patient Registered');
    setFormData({ ...formData, firstName: '' }); // Reset
  };

  const handleUpdate = () => {
    // Mock update
    alert('Patient Updated');
  };

  const viewPatient = (patient) => {
    setSelectedPatient(patient);
  };

  return (
    <div>
      <h1>Patient Management</h1>
      {/* Universal Search */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onSearch={handleSearch}
        placeholder="Search by ID, Name, Phone, Insurance"
      />
      {patientData.map((p) => (
        <div key={p.id} onClick={() => viewPatient(p)}>{p.name}</div>
      ))}

      {/* Registration Form */}
      {(role === ROLES.ADMIN_STAFF || role === ROLES.SYSTEM_ADMIN) && (
        <form onSubmit={handleRegister} className="card">
          <h2>Register New Patient</h2>
          <div className="grid two">
            <input value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} placeholder="First Name" required />
            <input value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} placeholder="Last Name" required />
            <input type="date" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} placeholder="DOB" required />
            <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="Phone" />
            <input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Email" />
            <input value={formData.emergencyName} onChange={(e) => setFormData({...formData, emergencyName: e.target.value})} placeholder="Emergency Contact Name" />
            <input value={formData.emergencyNumber} onChange={(e) => setFormData({...formData, emergencyNumber: e.target.value})} placeholder="Emergency Contact Number" />
            <select value={formData.branch} onChange={(e) => setFormData({...formData, branch: e.target.value})}>
              <option>Colombo</option>
              <option>Kandy</option>
              <option>Galle</option>
            </select>
            <input value={formData.insuranceProvider} onChange={(e) => setFormData({...formData, insuranceProvider: e.target.value})} placeholder="Insurance Provider" />
            <input value={formData.policyNumber} onChange={(e) => setFormData({...formData, policyNumber: e.target.value})} placeholder="Policy Number" />
          </div>
          {error && <div className="error">{error}</div>}
          <div className="actions">
            <button type="submit">Register</button>
          </div>
        </form>
      )}

      {/* Profile View with Tabs */}
      {selectedPatient && (
        <div className="card">
          <h2>Patient Profile: {selectedPatient.name}</h2>
          <Tabs
            tabs={[
              { key: 'Personal', label: 'Personal' },
              { key: 'Medical', label: 'Medical' },
              { key: 'Insurance', label: 'Insurance' },
              { key: 'History', label: 'History' },
            ]}
            activeKey={activeTab}
            onChange={setActiveTab}
          />
          <div className="tab-content">
            {activeTab === 'Personal' && <p>Personal Details: Name, DOB, etc. (Edit form here)</p>}
            {activeTab === 'Medical' && <p>Medical History (Mock)</p>}
            {activeTab === 'Insurance' && <p>Insurance Details (Mock)</p>}
            {activeTab === 'History' && <p>Appointment/Treatment History (Chronological)</p>}
          </div>
          {(role !== ROLES.PATIENT) && (
            <button onClick={handleUpdate}>Update Profile</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Patients;
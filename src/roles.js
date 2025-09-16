// Role configuration and role-based navigation + quick actions

export const ROLES = {
  ADMIN_STAFF: 'Admin Staff',
  DOCTOR: 'Doctor',
  BILLING_STAFF: 'Billing Staff',
  SYSTEM_ADMIN: 'System Admin',
  PATIENT: 'Patient'
};

export const ROLE_NAV = {
  [ROLES.ADMIN_STAFF]: [
    { path: '/', label: 'Dashboard' },
    { path: '/patients', label: 'Patients' },
    { path: '/appointments', label: 'Appointments' },
    { path: '/billing', label: 'Billing' },
    { path: '/reporting', label: 'Reporting' }
  ],
  [ROLES.DOCTOR]: [
    { path: '/', label: 'Dashboard' },
    { path: '/appointments', label: 'Appointments' },
    { path: '/treatments', label: 'Treatments' },
    { path: '/patients', label: 'Patients' }
  ],
  [ROLES.BILLING_STAFF]: [
    { path: '/', label: 'Dashboard' },
    { path: '/billing', label: 'Billing' },
    { path: '/patients', label: 'Patients' },
    { path: '/reporting', label: 'Reporting' }
  ],
  [ROLES.SYSTEM_ADMIN]: [
    { path: '/', label: 'Dashboard' },
    { path: '/patients', label: 'Patients' },
    { path: '/appointments', label: 'Appointments' },
    { path: '/treatments', label: 'Treatments' },
    { path: '/billing', label: 'Billing' },
    { path: '/reporting', label: 'Reporting' }
  ],
  [ROLES.PATIENT]: [
    { path: '/', label: 'Dashboard' },
    { path: '/appointments', label: 'Appointments' }
  ]
};

export const ROLE_QUICK_ACTIONS = {
  [ROLES.ADMIN_STAFF]: [
    { id: 'newAppointment', label: 'New Appt' },
    { id: 'searchPatient', label: 'Search Patient' },
    { id: 'emergency', label: 'Emergency' }
  ],
  [ROLES.DOCTOR]: [
    { id: 'startConsult', label: 'Start Consult' },
    { id: 'notesTemplate', label: 'Notes Template' },
    { id: 'prescribe', label: 'Prescribe' }
  ],
  [ROLES.BILLING_STAFF]: [
    { id: 'generateInvoice', label: 'Gen Invoice' },
    { id: 'receivePayment', label: 'Receive Payment' },
    { id: 'submitClaim', label: 'Submit Claim' }
  ],
  [ROLES.SYSTEM_ADMIN]: [
    { id: 'viewReports', label: 'View Reports' },
    { id: 'auditLog', label: 'Audit Log' }
  ],
  [ROLES.PATIENT]: [
    { id: 'bookAppointment', label: 'Book Appt' },
    { id: 'viewBills', label: 'View Bills' }
  ]
};


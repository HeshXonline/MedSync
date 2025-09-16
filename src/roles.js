// Role configuration: navigation and quick actions per role

export const ROLES = {
  ADMIN_STAFF: "Admin Staff",
  DOCTOR: "Doctor",
  BILLING_STAFF: "Billing Staff",
  SYSTEM_ADMIN: "System Admin",
  PATIENT: "Patient",
};

export const roleConfig = {
  [ROLES.ADMIN_STAFF]: {
    nav: [
      { path: "/", label: "Dashboard" },
      { path: "/patients", label: "Patients" },
      { path: "/appointments", label: "Appointments" },
      { path: "/reporting", label: "Reporting" },
    ],
    quickActions: [
      { key: "newAppt", label: "New Appt" },
      { key: "searchPatient", label: "Search Patient" },
      { key: "walkIn", label: "Emergency" },
    ],
  },
  [ROLES.DOCTOR]: {
    nav: [
      { path: "/", label: "Dashboard" },
      { path: "/appointments", label: "Appointments" },
      { path: "/treatments", label: "Treatments" },
      { path: "/patients", label: "Patients" },
    ],
    quickActions: [
      { key: "startConsult", label: "Start Consult" },
      { key: "prescribe", label: "Prescribe" },
    ],
  },
  [ROLES.BILLING_STAFF]: {
    nav: [
      { path: "/", label: "Dashboard" },
      { path: "/billing", label: "Billing" },
      { path: "/reporting", label: "Reporting" },
    ],
    quickActions: [
      { key: "collectPayment", label: "Collect Payment" },
      { key: "submitClaim", label: "Submit Claim" },
    ],
  },
  [ROLES.SYSTEM_ADMIN]: {
    nav: [
      { path: "/", label: "Dashboard" },
      { path: "/patients", label: "Patients" },
      { path: "/appointments", label: "Appointments" },
      { path: "/treatments", label: "Treatments" },
      { path: "/billing", label: "Billing" },
      { path: "/reporting", label: "Reporting" },
    ],
    quickActions: [
      { key: "userMgmt", label: "User Mgmt" },
      { key: "branchMgmt", label: "Branch Mgmt" },
    ],
  },
  [ROLES.PATIENT]: {
    nav: [
      { path: "/", label: "Dashboard" },
      { path: "/appointments", label: "Appointments" },
    ],
    quickActions: [
      { key: "bookAppt", label: "Book Appt" },
    ],
  },
};

export const pageAccess = {
  dashboard: [
    ROLES.ADMIN_STAFF,
    ROLES.DOCTOR,
    ROLES.BILLING_STAFF,
    ROLES.SYSTEM_ADMIN,
    ROLES.PATIENT,
  ],
  patients: [ROLES.ADMIN_STAFF, ROLES.DOCTOR, ROLES.SYSTEM_ADMIN, ROLES.BILLING_STAFF],
  appointments: [ROLES.ADMIN_STAFF, ROLES.DOCTOR, ROLES.SYSTEM_ADMIN, ROLES.PATIENT],
  treatments: [ROLES.DOCTOR, ROLES.SYSTEM_ADMIN],
  billing: [ROLES.BILLING_STAFF, ROLES.SYSTEM_ADMIN],
  reporting: [ROLES.ADMIN_STAFF, ROLES.BILLING_STAFF, ROLES.SYSTEM_ADMIN],
};


import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Treatments from "./pages/Treatments";
import Billing from "./pages/Billing";
import Reporting from "./pages/Reporting";
import NotAuthorized from "./pages/NotAuthorized";
import { ROLES } from "./roles";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState("Colombo");

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <>
      {isAuthenticated && (
        <Header
          role={userRole}
          branch={selectedBranch}
          setBranch={setSelectedBranch}
          onLogout={handleLogout}
        />
      )}

      <Routes>
        <Route
          path="/login"
          element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" replace />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole}>
              <Dashboard role={userRole} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patients"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={[ROLES.ADMIN_STAFF, ROLES.DOCTOR, ROLES.BILLING_STAFF, ROLES.SYSTEM_ADMIN]}>
              <Patients role={userRole} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={[ROLES.ADMIN_STAFF, ROLES.DOCTOR, ROLES.PATIENT, ROLES.SYSTEM_ADMIN]}>
              <Appointments role={userRole} branch={selectedBranch} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/treatments"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={[ROLES.DOCTOR, ROLES.SYSTEM_ADMIN]}>
              <Treatments role={userRole} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/billing"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={[ROLES.BILLING_STAFF, ROLES.SYSTEM_ADMIN]}>
              <Billing role={userRole} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reporting"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={[ROLES.ADMIN_STAFF, ROLES.BILLING_STAFF, ROLES.SYSTEM_ADMIN]}>
              <Reporting role={userRole} />
            </ProtectedRoute>
          }
        />
        <Route path="/403" element={<NotAuthorized />} />
      </Routes>
    </>
  );
}

export default App;

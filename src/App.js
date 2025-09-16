import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Layout from "./components/Layout";
import RequireRole from "./components/RequireRole";
import { pageAccess } from "./roles";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Treatments from "./pages/Treatments";
import Billing from "./pages/Billing";
import Reporting from "./pages/Reporting";

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
      <Routes>
        <Route
          path="/login"
          element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" replace />}
        />
        {isAuthenticated ? (
          <Route
            element={
              <Layout
                role={userRole}
                branch={selectedBranch}
                setBranch={setSelectedBranch}
                onLogout={handleLogout}
              />
            }
          >
            <Route
              path="/"
              element={
                <RequireRole allowedRoles={pageAccess.dashboard} role={userRole}>
                  <Dashboard role={userRole} />
                </RequireRole>
              }
            />
            <Route
              path="/patients"
              element={
                <RequireRole allowedRoles={pageAccess.patients} role={userRole}>
                  <Patients role={userRole} />
                </RequireRole>
              }
            />
            <Route
              path="/appointments"
              element={
                <RequireRole allowedRoles={pageAccess.appointments} role={userRole}>
                  <Appointments role={userRole} branch={selectedBranch} />
                </RequireRole>
              }
            />
            <Route
              path="/treatments"
              element={
                <RequireRole allowedRoles={pageAccess.treatments} role={userRole}>
                  <Treatments role={userRole} />
                </RequireRole>
              }
            />
            <Route
              path="/billing"
              element={
                <RequireRole allowedRoles={pageAccess.billing} role={userRole}>
                  <Billing role={userRole} />
                </RequireRole>
              }
            />
            <Route
              path="/reporting"
              element={
                <RequireRole allowedRoles={pageAccess.reporting} role={userRole}>
                  <Reporting role={userRole} />
                </RequireRole>
              }
            />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </>
  );
}

export default App;

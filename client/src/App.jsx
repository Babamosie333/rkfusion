import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

// This path is NOT linked anywhere in the public site's navigation or footer.
// Only someone who knows the exact URL can reach it. Change it in client/.env
// (VITE_ADMIN_PATH) to something private before you deploy.
const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH || "/rk-admin-portal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path={`${ADMIN_PATH}/login`} element={<AdminLogin />} />
      <Route
        path={ADMIN_PATH}
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Unknown paths quietly fall back to the public homepage */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

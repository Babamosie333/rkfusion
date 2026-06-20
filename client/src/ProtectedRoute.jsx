import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";

const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH || "/rk-admin-portal";

const ProtectedRoute = ({ children }) => {
  const { admin, checking } = useAuth();

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink text-linen font-mono text-sm tracking-widest2 uppercase">
        Checking session...
      </div>
    );
  }

  if (!admin) {
    return <Navigate to={`${ADMIN_PATH}/login`} replace />;
  }

  return children;
};

export default ProtectedRoute;

import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import About from "./pages/About";
import BMC from "./pages/BMC";
import Climbs from "./pages/Climbs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyClimbs from "./pages/MyClimbs";
import Dashboard from "./pages/admin/Dashboard";
import OpenClimbs from "./pages/admin/OpenClimbs";
import Participants from "./pages/admin/Participants";

function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/home" replace />;
  if (!adminOnly && user.role === "admin") return <Navigate to="/admin/dashboard" replace />;
  return children;
}

function GuestRoute({ children }) {
  const { user } = useAuth();
  if (user) return <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/home"} replace />;
  return children;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/bmc" element={<BMC />} />
          <Route path="/climbs" element={<Climbs />} />
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
          <Route path="/myclimbs" element={<ProtectedRoute><MyClimbs /></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/openclimbs" element={<ProtectedRoute adminOnly><OpenClimbs /></ProtectedRoute>} />
          <Route path="/admin/participants" element={<ProtectedRoute adminOnly><Participants /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
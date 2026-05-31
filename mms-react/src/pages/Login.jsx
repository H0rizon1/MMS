import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/auth.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotMsg, setForgotMsg] = useState("");

  function handleLogin() {
    setError("");
    setForgotMsg("");
    if (!username) { setError("Please enter your username."); return; }
    if (!password) { setError("Please enter your password."); return; }

    setLoading(true);
    setTimeout(() => {
      const success = login(username, password, remember);
      if (!success) {
        setError("Incorrect username or password. Please try again.");
        setLoading(false);
        return;
      }
      // navigation handled by GuestRoute in App.jsx
    }, 500);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleLogin();
  }

  return (
    <>
      <div className="auth-bg"></div>
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-logo">
            <div className="auth-logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M3 18 L12 6 L21 18" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 18 L12 11 L17 18" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="auth-logo-text">MMS</span>
          </div>

          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Login to access your account</p>

          {error && <div className="auth-error show">{error}</div>}
          {forgotMsg && <div className="auth-error show" style={{color:'var(--green-dark)'}}>{forgotMsg}</div>}

          <div className="auth-field">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              autoComplete="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <div className="auth-password-wrap">
              <input
                type={showPw ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button type="button" className="auth-toggle-pw" onClick={() => setShowPw(!showPw)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="auth-options">
            <label className="auth-remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
              />
              <span>Remember Me</span>
            </label>
            <button
              type="button"
              className="auth-forget"
              onClick={() => setForgotMsg("Please contact an MMS admin to reset your password.")}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="button"
            className="auth-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {loading ? "Signing in..." : "Login"}
          </button>

          <div className="auth-divider"></div>
          <p className="auth-switch">Don't have an account? <Link to="/signup">Sign Up</Link></p>

          <div className="auth-demo">
            <div className="auth-demo-title">Demo Accounts:</div>
            <div className="auth-demo-item">Admin: jenaruanes | Admin123</div>
            <div className="auth-demo-item">user: desireeLagman | User123</div>
          </div>
        </div>
      </div>
    </>
  );
}
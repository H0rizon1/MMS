import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/auth.css";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSignup() {
    setError("");
    setSuccess("");

    if (!fullName)                        { setError("Please enter your full name."); return; }
    if (!email)                           { setError("Please enter your email."); return; }
    if (!username)                        { setError("Please choose a username."); return; }
    if (username.length < 3)              { setError("Username must be at least 3 characters."); return; }
    if (!password)                        { setError("Please enter a password."); return; }
    if (password.length < 6)             { setError("Password must be at least 6 characters."); return; }
    if (password !== confirmPassword)     { setError("Passwords do not match."); return; }

    const result = signup(fullName, email, username, password);
    if (!result.success) { setError(result.error); return; }

    setLoading(true);
    setSuccess("Account created! Redirecting to login...");
    setTimeout(() => navigate("/login"), 1500);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSignup();
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

          <h1 className="auth-title">Join MMS</h1>
          <p className="auth-subtitle">Create an account to start your adventure</p>

          {error && <div className="auth-error show">{error}</div>}
          {success && <div className="auth-success show">{success}</div>}

          <div className="auth-field">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Juan Dela Cruz"
              autoComplete="name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="juan@example.com"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="auth-field">
            <label>Username</label>
            <input
              type="text"
              placeholder="Choose a username"
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
                placeholder="Create a password"
                autoComplete="new-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button type="button" className="auth-toggle-pw" onClick={() => setShowPw(!showPw)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="auth-field">
            <label>Confirm Password</label>
            <div className="auth-password-wrap">
              <input
                type={showConfirmPw ? "text" : "password"}
                placeholder="Confirm your password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button type="button" className="auth-toggle-pw" onClick={() => setShowConfirmPw(!showConfirmPw)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>
          </div>

          <button
            type="button"
            className="auth-btn"
            onClick={handleSignup}
            disabled={loading}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <line x1="19" y1="8" x2="19" y2="14"/>
              <line x1="22" y1="11" x2="16" y2="11"/>
            </svg>
            Create Account
          </button>

          <div className="auth-divider"></div>
          <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </>
  );
}
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/style.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <nav>
      <Link className="nav-logo" to="/home">
        <div className="nav-logo-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M3 18 L12 6 L21 18" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 18 L12 11 L17 18" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="nav-logo-text">MMS</span>
      </Link>

      <ul className="nav-links">
        <li><Link to="/home" className={isActive("/home")}>Home</Link></li>
        <li><Link to="/about" className={isActive("/about")}>About MMS</Link></li>
        <li><Link to="/bmc" className={isActive("/bmc")}>BMC</Link></li>
        <li><Link to="/climbs" className={isActive("/climbs")}>Open Climbs</Link></li>
        {user && user.role !== "admin" && (
          <li><Link to="/myclimbs" className={isActive("/myclimbs")}>My Climbs</Link></li>
        )}
      </ul>

      {user ? (
        <div className="nav-user">
          <div className="nav-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round"/>
            </svg>
          </div>
          <span>{user.fullName.split(" ")[0]}</span>
          <button className="nav-logout-btn" onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className="nav-auth">
          <Link to="/login" className="nav-login">Login</Link>
          <Link to="/signup" className="nav-signup">Sign Up</Link>
        </div>
      )}
    </nav>
  );
}
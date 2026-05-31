import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M3 18 L12 6 L21 18" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 18 L12 11 L17 18" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <div className="sidebar-brand-name">MMS Admin</div>
          <div className="sidebar-brand-sub">Dashboard</div>
        </div>
      </div>

      <div className="sidebar-admin">
        <div className="sidebar-admin-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <circle cx="12" cy="8" r="4"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <div className="sidebar-admin-name">{user?.fullName || 'Admin'}</div>
          <div className="sidebar-admin-role">Administrator</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/openclimbs"
          className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 18 L12 5 L21 18" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Open Climbs
        </NavLink>

        <NavLink
          to="/admin/participants"
          className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="7" r="3"/>
            <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5"/>
            <circle cx="17" cy="7" r="3"/>
            <path d="M17 12c2.7 0 5 2 5 5"/>
          </svg>
          Participants
        </NavLink>
      </nav>

      <div className="sidebar-logout">
        <button className="sidebar-logout-btn" onClick={handleLogout}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}
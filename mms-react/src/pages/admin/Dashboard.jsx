import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from '../../components/AdminSidebar';

const recentClimbs = [
  { id: 'kapig', name: 'Mt. Kapigpiglatan', date: 'June 15–16, 2026', joined: 2, limit: 20, img: '/mtkapig.jpg' },
  { id: 'pulag', name: 'Mt. Pulag',         date: 'July 20–22, 2026',  joined: 1, limit: 25, img: '/pulag1.jpg' },
  { id: 'ulap', name: 'Mt. Ulap',           date: 'August 5–6, 2026',  joined: 0, limit: 30, img: '/MtUlap.jpg' },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <h1 className="admin-page-title">Welcome, {user?.fullName}</h1>
        <p className="admin-page-sub">Here's an overview of your mountaineering organization</p>

        <div className="admin-stats">
          <div className="admin-stat-card">
            <div className="admin-stat-icon green">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="9" cy="7" r="3"/>
                <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5"/>
                <circle cx="17" cy="7" r="3"/>
                <path d="M17 12c2.7 0 5 2 5 5"/>
              </svg>
            </div>
            <div>
              <div className="admin-stat-num">3</div>
              <div className="admin-stat-label">Total Participants</div>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M3 18 L12 5 L21 18" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="admin-stat-num">3</div>
              <div className="admin-stat-label">Upcoming Climbs</div>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon teal">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
              </svg>
            </div>
            <div>
              <div className="admin-stat-num">2</div>
              <div className="admin-stat-label">Paid Participants</div>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon orange">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <path d="M16 2v4M8 2v4M3 10h18"/>
              </svg>
            </div>
            <div>
              <div className="admin-stat-num">1</div>
              <div className="admin-stat-label">Pending Participants</div>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-stat-title">Quick Actions</div>
          <Link to="/admin/openclimbs" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Create New Climb
          </Link>
        </div>

        <div className="admin-card">
          <div className="admin-card-title">Recent Climbs</div>
          {recentClimbs.map(climb => (
            <div className="recent-climb-item" key={climb.id}>
              <div className="recent-climb-img">
                <img src={climb.img} alt={climb.name} />
              </div>
              <div>
                <div className="recent-climb-name">{climb.name}</div>
                <div className="recent-climb-date">{climb.date}</div>
              </div>
              <div className="recent-climb-count">
                <div className="recent-climb-count-num">{climb.joined}/{climb.limit}</div>
                <div className="recent-climb-count-label">participants</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
import { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const initialParticipants = [
  { name: 'Desiree Lagman', email: 'desiree.lagman@mms.org', contact: '0917-111-2222', emergency: 'Sarah Lagman - 0918-222-3333', climb: 'Mt. Kapigpiglatan', experience: 'Beginner',     payment: 'paid'    },
  { name: 'Mark Johnson',   email: 'mark.j@email.com',        contact: '0919-333-4444', emergency: 'Jane Johnson - 0920-444-5555',  climb: 'Mt. Kapigpiglatan', experience: 'Intermediate', payment: 'pending' },
  { name: 'Lisa Chen',      email: 'lisa.chen@email.com',     contact: '0921-555-6666', emergency: 'Robert Chen - 0922-666-7777',   climb: 'Mt. Pulag',         experience: 'Advanced',     payment: 'paid'    },
];

export default function Participants() {
  const [participants, setParticipants] = useState(initialParticipants);
  const [search, setSearch]             = useState('');
  const [detailModal, setDetailModal]   = useState(false);
  const [selected, setSelected]         = useState(null);

  const filtered = participants.filter(p => {
    const q = search.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q) || p.climb.toLowerCase().includes(q);
  });

  function togglePayment(index) {
    setParticipants(prev => prev.map((p, i) =>
      i === index ? { ...p, payment: p.payment === 'paid' ? 'pending' : 'paid' } : p
    ));
    // Update selected if detail modal is open
    if (selected !== null && selected === index) {
      setSelected(index);
    }
  }

  function viewDetail(index) {
    setSelected(index);
    setDetailModal(true);
  }

  const p = selected !== null ? participants[selected] : null;

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <h1 className="admin-page-title">Participants Management</h1>
        <p className="admin-page-sub">View and manage all climb participants</p>

        <div className="admin-card">
          <div className="admin-toolbar">
            <div className="admin-search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search participants..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button className="btn-outline" onClick={() => alert('Export feature coming soon!')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              Export
            </button>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contacts</th>
                  <th>Climb</th>
                  <th>Experience</th>
                  <th>Payment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                      No participants found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((p, i) => {
                    const globalIndex = participants.indexOf(p);
                    return (
                      <tr key={i}>
                        <td>
                          <div className="participant-name">{p.name}</div>
                          <div className="participant-email">{p.email}</div>
                        </td>
                        <td>
                          <div className="participant-contact">{p.contact}</div>
                          <div className="participant-emergency">{p.emergency}</div>
                        </td>
                        <td>{p.climb}</td>
                        <td>
                          <span className={`badge badge-${p.experience.toLowerCase()}`}>{p.experience}</span>
                        </td>
                        <td>
                          <span
                            className={`badge badge-${p.payment}`}
                            style={{ cursor: 'pointer', userSelect: 'none' }}
                            title="Click to toggle payment status"
                            onClick={() => togglePayment(globalIndex)}
                          >
                            {p.payment}
                          </span>
                        </td>
                        <td>
                          <button className="table-action-btn" onClick={() => viewDetail(globalIndex)}>
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      {detailModal && p && (
        <div className="modal-overlay active" onClick={e => e.target === e.currentTarget && setDetailModal(false)}>
          <div className="modal modal-lg">
            <div className="modal-header">
              <h2>{p.name}</h2>
              <button className="modal-close" onClick={() => setDetailModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-row" style={{ gap: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Full Name</div>
                  <div style={{ fontWeight: 700 }}>{p.name}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Email</div>
                  <div style={{ fontWeight: 700 }}>{p.email}</div>
                </div>
              </div>
              <div className="form-row" style={{ gap: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Contact Number</div>
                  <div style={{ fontWeight: 700 }}>{p.contact}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Emergency Contact</div>
                  <div style={{ fontWeight: 700 }}>{p.emergency}</div>
                </div>
              </div>
              <div className="form-row" style={{ gap: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Registered Climb</div>
                  <div style={{ fontWeight: 700 }}>{p.climb}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Experience Level</div>
                  <span className={`badge badge-${p.experience.toLowerCase()}`}>{p.experience}</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Payment Status</div>
                <span
                  className={`badge badge-${p.payment}`}
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                  title="Click to toggle payment status"
                  onClick={() => togglePayment(selected)}
                >
                  {p.payment}
                </span>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>Click badge to toggle</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
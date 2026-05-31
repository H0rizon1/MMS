import { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const initialClimbs = [
  { id: 'kapig', name: 'Mt. Kapigpiglatan', location: 'Benguet', schedule: 'June 15–16, 2026',  difficulty: '4/9', elevation: '1,028 MASL', limit: 20, joined: 2, desc: 'A beginner-friendly mountain perfect for first-time hikers.',         img: '/mtkapig.jpg', status: 'upcoming' },
  { id: 'pulag', name: 'Mt. Pulag',         location: 'Benguet', schedule: 'July 20–22, 2026',  difficulty: '5/9', elevation: '2,922 MASL', limit: 25, joined: 1, desc: 'The third highest peak in the Philippines. Famous for its sea of clouds.', img: '/pulag1.jpg',  status: 'upcoming' },
  { id: 'ulap',  name: 'Mt. Ulap',          location: 'Benguet', schedule: 'August 5–6, 2026',  difficulty: '3/9', elevation: '1,846 MASL', limit: 30, joined: 0, desc: 'Known for its Godzilla-like mountain ridges and rolling hills.',          img: '/MtUlap.jpg',  status: 'upcoming' },
];

const initialParticipants = {
  kapig: [
    { name: 'Desiree Lagman', email: 'desiree.lagman@mms.org', contact: '0917-111-2222', emergency: 'Sarah Lagman - 0918-222-3333', experience: 'Beginner',     payment: 'paid'    },
    { name: 'Mark Johnson',   email: 'mark.j@email.com',        contact: '0919-333-4444', emergency: 'Jane Johnson - 0920-444-5555',  experience: 'Intermediate', payment: 'pending' },
  ],
  pulag: [
    { name: 'Lisa Chen', email: 'lisa.chen@email.com', contact: '0921-555-6666', emergency: 'Robert Chen - 0922-666-7777', experience: 'Advanced', payment: 'paid' },
  ],
  ulap: [],
};

const emptyForm = { name: '', difficulty: '', elevation: '', location: '', schedule: '', limit: '', desc: '' };

export default function OpenClimbs() {
  const [climbs, setClimbs] = useState(initialClimbs);
  const [participants] = useState(initialParticipants);

  const [climbModal, setClimbModal]           = useState(false);
  const [participantsModal, setParticipantsModal] = useState(false);
  const [editingId, setEditingId]             = useState(null);
  const [form, setForm]                       = useState(emptyForm);
  const [viewingClimb, setViewingClimb]       = useState(null);

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setClimbModal(true);
  }

  function openEdit(climb) {
    setEditingId(climb.id);
    setForm({
      name: climb.name, difficulty: climb.difficulty, elevation: climb.elevation,
      location: climb.location, schedule: climb.schedule,
      limit: climb.limit, desc: climb.desc,
    });
    setClimbModal(true);
  }

  function openParticipants(climb) {
    setViewingClimb(climb);
    setParticipantsModal(true);
  }

  function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this climb?')) return;
    setClimbs(prev => prev.filter(c => c.id !== id));
  }

  function handleSave() {
    const { name, location, schedule } = form;
    if (!name || !location || !schedule) {
      alert('Please fill in at least the name, location, and schedule.');
      return;
    }
    if (editingId) {
      setClimbs(prev => prev.map(c =>
        c.id === editingId
          ? { ...c, name: form.name, difficulty: form.difficulty, elevation: form.elevation, location: form.location, schedule: form.schedule, limit: parseInt(form.limit) || c.limit, desc: form.desc }
          : c
      ));
    } else {
      const newId = form.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      setClimbs(prev => [...prev, {
        id: newId, name: form.name, location: form.location, schedule: form.schedule,
        difficulty: form.difficulty, elevation: form.elevation,
        limit: parseInt(form.limit) || 20, joined: 0,
        desc: form.desc, img: '/hero.jpg', status: 'upcoming',
      }]);
    }
    setClimbModal(false);
  }

  const viewParticipants = viewingClimb ? (participants[viewingClimb.id] || []) : [];

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <div className="admin-page-header">
          <div>
            <h1 className="admin-page-title">Open Climbs Management</h1>
            <p className="admin-page-sub">Manage all your climbing events</p>
          </div>
          <button className="btn-primary" onClick={openCreate}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Create New Climb
          </button>
        </div>

        <div className="admin-climbs-grid">
          {climbs.map(climb => (
            <div className="admin-climb-card" key={climb.id}>
              <div className="admin-climb-card-img">
                <img src={climb.img} alt={climb.name} onError={e => e.target.style.background = '#e8f5ee'} />
              </div>
              <div className="admin-climb-card-body">
                <div className="admin-climb-card-name">{climb.name}</div>
                <div className="admin-climb-card-meta">{climb.location} • {climb.schedule}</div>
                <div className="admin-climb-card-joined">{climb.joined}/{climb.limit} joined</div>
                <span className="admin-climb-status">{climb.status}</span>
                <div className="admin-climb-actions">
                  <button className="btn-primary" onClick={() => openParticipants(climb)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    View
                  </button>
                  <button className="btn-icon edit" onClick={() => openEdit(climb)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button className="btn-icon delete" onClick={() => handleDelete(climb.id)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Climb Create/Edit Modal */}
      {climbModal && (
        <div className="modal-overlay active" onClick={e => e.target === e.currentTarget && setClimbModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <h2>{editingId ? 'Edit Climb' : 'Create New Climb'}</h2>
              <button className="modal-close" onClick={() => setClimbModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-field">
                <label>Mountain Name</label>
                <input type="text" placeholder="Mt. Example" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Difficulty</label>
                  <input type="text" placeholder="5/9" value={form.difficulty} onChange={e => setForm(f => ({ ...f, difficulty: e.target.value }))} />
                </div>
                <div className="form-field">
                  <label>Elevation</label>
                  <input type="text" placeholder="1,000 MASL" value={form.elevation} onChange={e => setForm(f => ({ ...f, elevation: e.target.value }))} />
                </div>
              </div>
              <div className="form-field">
                <label>Location</label>
                <input type="text" placeholder="Province" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
              </div>
              <div className="form-field">
                <label>Schedule</label>
                <input type="text" placeholder="June 15-16, 2026" value={form.schedule} onChange={e => setForm(f => ({ ...f, schedule: e.target.value }))} />
              </div>
              <div className="form-field">
                <label>Participant Limit</label>
                <input type="number" placeholder="20" value={form.limit} onChange={e => setForm(f => ({ ...f, limit: e.target.value }))} />
              </div>
              <div className="form-field">
                <label>Description</label>
                <textarea placeholder="Describe the climb..." value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} />
              </div>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleSave}>
                {editingId ? 'Save Changes' : 'Create Climb'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Participants Modal */}
      {participantsModal && viewingClimb && (
        <div className="modal-overlay active" onClick={e => e.target === e.currentTarget && setParticipantsModal(false)}>
          <div className="modal modal-lg">
            <div className="modal-header">
              <h2>{viewingClimb.name} - Participants</h2>
              <button className="modal-close" onClick={() => setParticipantsModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              {viewParticipants.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem 0' }}>No participants yet.</p>
              ) : (
                viewParticipants.map((p, i) => (
                  <div className="participant-modal-card" key={i}>
                    <div>
                      <div className="participant-modal-name">{p.name}</div>
                      <div className="participant-modal-detail">
                        Email: {p.email}<br />
                        Emergency: {p.emergency}<br />
                        Contact: {p.contact} &nbsp;|&nbsp; Experience: {p.experience}
                      </div>
                    </div>
                    <span className={`badge badge-${p.payment}`}>{p.payment}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
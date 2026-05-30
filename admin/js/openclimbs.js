let climbs = [
  {
    id: 'kapig',
    name: 'Mt. Kapigpiglatan',
    location: 'Benguet',
    schedule: 'June 15–16, 2026',
    difficulty: '4/9',
    elevation: '1,028 MASL',
    limit: 20,
    joined: 12,
    desc: 'A beginner-friendly mountain perfect for first-time hikers.',
    img: '../images/mtkapig.jpg',
    status: 'upcoming',
  },
  {
    id: 'pulag',
    name: 'Mt. Pulag',
    location: 'Benguet',
    schedule: 'July 20–22, 2026',
    difficulty: '5/9',
    elevation: '2,922 MASL',
    limit: 25,
    joined: 18,
    desc: 'The third highest peak in the Philippines. Famous for its sea of clouds.',
    img: '../images/pulag1.jpg',
    status: 'upcoming',
  },
  {
    id: 'ulap',
    name: 'Mt. Ulap',
    location: 'Benguet',
    schedule: 'August 5–6, 2026',
    difficulty: '3/9',
    elevation: '1,846 MASL',
    limit: 30,
    joined: 8,
    desc: 'Known for its Godzilla-like mountain ridges and rolling hills.',
    img: '../images/MtUlap.jpg',
    status: 'upcoming',
  },
];

const participantsByClimbs = {
    kapig: [
    { name: 'Desiree Lagman', email: 'desiree.lagman@mms.org', contact: '0917-111-2222', emergency: 'Sarah Lagman - 0918-222-3333', experience: 'Beginner', payment: 'paid' },
    { name: 'Mark Johnson', email: 'mark.j@email.com', contact: '0919-333-4444', emergency: 'Jane Johnson - 0920-444-5555', experience: 'Intermediate', payment: 'pending' },
  ],
  pulag: [
    { name: 'Lisa Chen', email: 'lisa.chen@email.com', contact: '0921-555-6666', emergency: 'Robert Chen - 0922-666-7777', experience: 'Advanced', payment: 'paid' },
  ],
  ulap: [],
};

let editingClimbId = null;

document.addEventListener('DOMContentLoaded', () => {
    renderClimbs();

    document.getElementById('createClimbBtn').addEventListener('click', () => {
        editingClimbId = null;
        document.getElementById('climbModalTitle').textContent = 'Create New Climb';
        document.getElementById('savedClimbBtn').textContent = 'Create Climb';
        clearForm();
        openModal('climbModal');
    });

    document.getElementById('closeClimbModal').addEventListener('click', () => closeModal('climbModal'));
    document.getElementById('closeParticipantsModal').addEventListener('click', () => closeModal('paticipantsModal'));
 
    document.getElementById('savedClimbBtn').addEventListener('click', saveClimb);
});

function renderClimbs() {
    const grid = document.getElementById('climbsGrid');
    grid.innerHTML = '';

    climbs.forEach(climb => {
        const card = document.createElement('div');
        card.className = 'admin-climb-card';
        card.innerHTML = `
            <div class="admin-climb-card-img">
                <img src="${climb.img}" alt="${climb.name}" onerror="this.style.background='#e8f5ee'" />
            </div>
            <div class="admin-climb-card-body">
                <div class="admin-climb-card-name">${climb.name}</div>
                <div class="admin-climb-card-meta">${climb.location} • ${climb.schedule}</div>
                <div class="admin-climb-card-joined">${climb.joined}/${climb.limit} joined</div>
                <span class="admin-climb-status">${climb.status}</span>
                <div class="admin-climb-actions">
                    <button class="btn-primary" onclick="viewParticipants('${climb.id}')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        View
                    </button>
                    <button class="btn-icon edit" onclick="editClimb('${climb.id}')">
                        <svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor"/></svg>
                    </button>
                    <button class="btn-icon delete" onclick="deleteClimb('${climb.id}')">
                        <svg viewBox="0 0 24 24" fill="none" stroke-width="2"><polyline points="3 6 5 6 21 6" stroke="currentColor"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke="currentColor"/><path d="M10 11v6M14 11v6" stroke="currentColor"/></svg>
                    </button>
                </div>
            </div>
        `;
      grid.appendChild(card);
    });
}

function viewParticipants(climbId) {
    const climb = climbs.find(c => c.id === climbId);
    const participants = participantsByClimbs[climbId] || [];

    document.getElementById('participantsModalTitle').textContent = `${climb.name} - Participants`;

    const body = document.getElementById('participantsModalBody');

    if (participants.length === 0) {
        body.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:2rem 0;">No participants yet.</p>';
    } else {
        body.innerHTML = participants.map(p => `
            <div class="participant-modal-card">
        <div>
          <div class="participant-modal-name">${p.name}</div>
          <div class="participant-modal-detail">
            Email: ${p.email}<br>
            Emergency: ${p.emergency}<br>
            Contact: ${p.contact} &nbsp;|&nbsp; Experience: ${p.experience}
          </div>
        </div>
        <span class="badge badge-${p.payment}">${p.payment}</span>
      </div>
      `).join('');
    }

    openModal('paticipantsModal');
}

function editClimb(climbId) {
    const climb = climbs.find(c => c.id === climbId);
    editingClimbId = climbId;

    document.getElementById('climbModalTitle').textContent = 'Edit Climb';
    document.getElementById('savedClimbBtn').textContent = 'Save Changes';
    document.getElementById('fieldName').value = climb.name;
    document.getElementById('fieldDifficulty').value = climb.difficulty;
    document.getElementById('fieldElevation').value = climb.elevation;
    document.getElementById('fieldLocation').value = climb.location;
    document.getElementById('fieldSchedule').value = climb.schedule;
    document.getElementById('fieldLimit').value = climb.limit;
    document.getElementById('fieldDesc').value = climb.desc;

    openModal('climbModal');
}

function deleteClimb(climbId) {
    if (!confirm('Are you sure you want to delete this climb?')) return;
    climbs = climbs.filter(c => c.id !== climbId);
    renderClimbs();
}

function saveClimb() {
    const name     = document.getElementById('fieldName').value.trim();
    const diff     = document.getElementById('fieldDifficulty').value.trim();
    const elev     = document.getElementById('fieldElevation').value.trim();
    const loc      = document.getElementById('fieldLocation').value.trim();
    const schedule = document.getElementById('fieldSchedule').value.trim();
    const limit    = parseInt(document.getElementById('fieldLimit').value) || 20;
    const desc     = document.getElementById('fieldDesc').value.trim();
 
    if (!name || !loc || !schedule) {
        alert('Please fill in at least the name, location, and schedule.');
        return;
    }

    if (editingClimbId) {
        const idx = climbs.findIndex(c => c.id === editingClimbId);
        if (idx !== -1) {
            climbs[idx] = { ...climbs[idx], name, difficulty: diff, elevation:
                elev, location: loc, schedule, limit, desc };
        }
    } else {
        const newId = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        climbs.push({
            id: newId, name, location: loc, schedule,
            difficulty: diff, elevation: elev, limit, joined: 0,
            desc, img: '../images/hero.jpg', status: 'upcoming',
        });
        participantsByClimbs[newId] = [];
    }

    closeModal('climbModal');
    renderClimbs();
}

function clearForm() {
    ['fieldName', 'fieldDifficulty', 'fieldElevation', 'fieldLocation',
        'fieldSchedule', 'fieldDesc'].forEach(id => {
            document.getElementById(id).value = '';
    });
    document.getElementById('fieldLimit').value = '';
}
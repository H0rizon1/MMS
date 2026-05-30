const allParticipants = [
  {
    name: 'Desiree Lagman',
    email: 'desiree.lagman@mms.org',
    contact: '0917-111-2222',
    emergency: 'Sarah Lagman - 0918-222-3333',
    climb: 'Mt. Kapigpiglatan',
    experience: 'Beginner',
    payment: 'paid',
  },
  {
    name: 'Mark Johnson',
    email: 'mark.j@email.com',
    contact: '0919-333-4444',
    emergency: 'Jane Johnson - 0920-444-5555',
    climb: 'Mt. Kapigpiglatan',
    experience: 'Intermediate',
    payment: 'pending',
  },
  {
    name: 'Lisa Chen',
    email: 'lisa.chen@email.com',
    contact: '0921-555-6666',
    emergency: 'Robert Chen - 0922-666-7777',
    climb: 'Mt. Pulag',
    experience: 'Advanced',
    payment: 'paid',
  },
];

let filtered = [...allParticipants];

document.addEventListener('DOMContentLoaded', () => {
  renderTable(allParticipants);

  document.getElementById('searchInput').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    filtered = allParticipants.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.climb.toLowerCase().includes(q)
    );
    renderTable(filtered);
  });

  document.getElementById('exportBtn').addEventListener('click', () => {
    alert('Export feature coming soon!');
  });

  document.getElementById('closeDetailModal').addEventListener('click', () => closeModal('detailModal'));
});

function renderTable(participants) {
  const tbody = document.getElementById('participantsTableBody');

  if (participants.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center;padding:2rem;color:var(--text-muted);">
          No participants found.
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = participants.map((p, i) => `
    <tr>
      <td>
        <div class="participant-name">${p.name}</div>
        <div class="participant-email">${p.email}</div>
      </td>
      <td>
        <div class="participant-contact">${p.contact}</div>
        <div class="participant-emergency">${p.emergency}</div>
      </td>
      <td>${p.climb}</td>
      <td><span class="badge badge-${p.experience.toLowerCase()}">${p.experience}</span></td>
      <td><span class="badge badge-${p.payment}">${p.payment}</span></td>
      <td>
        <button class="table-action-btn" onclick="viewDetail(${allParticipants.indexOf(p)})">View Details</button>
      </td>
    </tr>
  `).join('');
}

function viewDetail(index) {
  const p = allParticipants[index];

  document.getElementById('detailModalTitle').textContent = p.name;
  document.getElementById('detailModalBody').innerHTML = `
    <div class="form-row" style="gap:1.5rem;">
      <div>
        <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:0.25rem;">Full Name</div>
        <div style="font-weight:700;">${p.name}</div>
      </div>
      <div>
        <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:0.25rem;">Email</div>
        <div style="font-weight:700;">${p.email}</div>
      </div>
    </div>
    <div class="form-row" style="gap:1.5rem;">
      <div>
        <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:0.25rem;">Contact Number</div>
        <div style="font-weight:700;">${p.contact}</div>
      </div>
      <div>
        <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:0.25rem;">Emergency Contact</div>
        <div style="font-weight:700;">${p.emergency}</div>
      </div>
    </div>
    <div class="form-row" style="gap:1.5rem;">
      <div>
        <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:0.25rem;">Registered Climb</div>
        <div style="font-weight:700;">${p.climb}</div>
      </div>
      <div>
        <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:0.25rem;">Experience Level</div>
        <span class="badge badge-${p.experience.toLowerCase()}">${p.experience}</span>
      </div>
    </div>
    <div>
      <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:0.25rem;">Payment Status</div>
      <span class="badge badge-${p.payment}">${p.payment}</span>
    </div>
  `;

  openModal('detailModal');
}
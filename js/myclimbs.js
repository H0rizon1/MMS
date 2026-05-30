const allClimbs = {
  kapig: {
    id: 'kapig',
    name: 'Mt. Kapigpiglatan',
    loc: 'Benguet',
    date: 'June 15–16, 2026',
    masl: '1,028 MASL',
    img: 'images/mtkapig.jpg',
    desc: 'A beginner-friendly mountain perfect for first-time hikers. Features scenic grasslands and pine forests.',
  },
  pulag: {
    id: 'pulag',
    name: 'Mt. Pulag',
    loc: 'Benguet',
    date: 'July 20–22, 2026',
    masl: '2,922 MASL',
    img: 'images/pulag1.jpg',
    desc: 'The third highest peak in the Philippines. Famous for its sea of clouds and stunning sunrise views.',
  },
  ulap: {
    id: 'ulap',
    name: 'Mt. Ulap',
    loc: 'Benguet',
    date: 'August 5–6, 2026',
    masl: '1,846 MASL',
    img: 'images/ulap1.jpg',
    desc: 'Known for its Godzilla-like mountain ridges and rolling hills. Perfect for beginners.',
  },
};

document.addEventListener('DOMContentLoaded', () => {

  const user = getCurrentUser();
  if (!user) { window.location.href = 'login.html'; return; }
  if (user.role === 'admin') { window.location.href = 'admin/dashboard.html'; return; }

  document.getElementById('welcomeName').textContent = `Welcome back, ${user.fullName}!`;
  const navNameEl = document.getElementById('navUserName');
  if (navNameEl) navNameEl.textContent = user.fullName.split(' ')[0];

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', logout);

  const allRegistrations = JSON.parse(localStorage.getItem('mms_registrations') || '[]');
  const myRegistrations = allRegistrations.filter(r => r.username === user.username);
  renderClimbs(myRegistrations);

  const updateContactBtn = document.getElementById('updateContactBtn');
  if (updateContactBtn) {
    updateContactBtn.addEventListener('click', openEmergencyContactModal);
  }

  loadEmergencyContact(user.username);

});

function renderClimbs(registeredClimbs) {
  const list = document.getElementById('climbsList') || document.getElementById('climbList');
  const emptyState = document.getElementById('emptyState');

  let upcoming = 0, confirmed = 0, pending = 0;

  if (!registeredClimbs || registeredClimbs.length === 0) {
    if (emptyState) emptyState.style.display = 'flex';
    updateStats(0, 0, 0);
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (list) list.innerHTML = '';

  registeredClimbs.forEach(reg => {
    const climb = allClimbs[reg.climbId];
    if (!climb || !list) return;

    upcoming++;
    if (reg.status === 'confirmed') confirmed++;
    if (reg.paymentStatus === 'unpaid' || reg.paymentStatus === 'pending') pending++;

    const statusBadge = reg.status === 'confirmed'
      ? `<span class="badge badge-confirmed">Confirmed</span>`
      : `<span class="badge badge-pending">Pending</span>`;

    const paymentBadge = reg.paymentStatus === 'paid'
      ? `<span class="badge badge-paid">Paid</span>`
      : `<span class="badge badge-unpaid">Unpaid</span>`;

    const card = document.createElement('div');
    card.className = 'climb-item';
    card.innerHTML = `
      <div class="climb-item-img">
        <img src="${climb.img}" alt="${climb.name}" />
      </div>
      <div class="climb-item-body">
        <div class="climb-item-top">
          <div class="climb-item-name">${climb.name}</div>
          <div class="climb-item-badges">${statusBadge}${paymentBadge}</div>
        </div>
        <div class="climb-item-meta">
          <span class="climb-item-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${climb.loc}
          </span>
          <span class="climb-item-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            ${climb.date}
          </span>
          <span class="climb-item-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18 L12 5 L21 18" stroke-linecap="round" stroke-linejoin="round"/></svg>
            ${climb.masl}
          </span>
        </div>
        <p class="climb-item-desc">${climb.desc}</p>
        <div class="climb-item-footer">
          <span class="climb-item-registered">Registered: ${reg.registeredAt}</span>
          <a href="climbs.html?open=${climb.id}" class="btn-green-sm">View Details</a>
        </div>
      </div>
    `;
    list.appendChild(card);
  });

  updateStats(upcoming, confirmed, pending);
}

function updateStats(upcoming, confirmed, pending) {
  const u = document.getElementById('statUpcoming');
  const c = document.getElementById('statConfirmed');
  const p = document.getElementById('statPending');
  if (u) u.textContent = upcoming;
  if (c) c.textContent = confirmed;
  if (p) p.textContent = pending;
}

function openEmergencyContactModal() {
  // Create modal if it doesn't exist yet
  if (!document.getElementById('emergencyModal')) {
    const modal = document.createElement('div');
    modal.id = 'emergencyModal';
    modal.style.cssText = `
      position:fixed; inset:0; background:rgba(0,0,0,0.5);
      display:flex; align-items:center; justify-content:center;
      z-index:9999; padding:1rem;
    `;
    modal.innerHTML = `
      <div style="background:#fff; border-radius:12px; padding:2rem; width:100%; max-width:440px; box-shadow:0 20px 60px rgba(0,0,0,0.2);">
        <h2 style="margin:0 0 0.25rem; font-size:1.2rem; color:#1a1a1a;">Emergency Contact</h2>
        <p style="margin:0 0 1.5rem; color:#666; font-size:0.9rem;">This information will be shared with climb officers in case of emergency.</p>
        <div style="display:flex; flex-direction:column; gap:1rem;">
          <div>
            <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.4rem; color:#333;">Contact Name</label>
            <input id="ecName" type="text" placeholder="Full name" style="width:100%; padding:0.6rem 0.8rem; border:1.5px solid #ddd; border-radius:8px; font-size:0.95rem; box-sizing:border-box;" />
          </div>
          <div>
            <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.4rem; color:#333;">Relationship</label>
            <input id="ecRelation" type="text" placeholder="e.g. Mother, Spouse, Friend" style="width:100%; padding:0.6rem 0.8rem; border:1.5px solid #ddd; border-radius:8px; font-size:0.95rem; box-sizing:border-box;" />
          </div>
          <div>
            <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.4rem; color:#333;">Phone Number</label>
            <input id="ecPhone" type="tel" placeholder="e.g. 0917-123-4567" style="width:100%; padding:0.6rem 0.8rem; border:1.5px solid #ddd; border-radius:8px; font-size:0.95rem; box-sizing:border-box;" />
          </div>
        </div>
        <div id="ecMsg" style="margin-top:0.75rem; font-size:0.85rem; color:#2e7d32; display:none;">✓ Contact info saved!</div>
        <div style="display:flex; gap:0.75rem; margin-top:1.5rem;">
          <button onclick="saveEmergencyContact()" style="flex:1; padding:0.7rem; background:#2d6a4f; color:#fff; border:none; border-radius:8px; font-size:0.95rem; font-weight:600; cursor:pointer;">Save</button>
          <button onclick="closeEmergencyContactModal()" style="flex:1; padding:0.7rem; background:#f5f5f5; color:#333; border:none; border-radius:8px; font-size:0.95rem; cursor:pointer;">Cancel</button>
        </div>
      </div>
    `;
    modal.addEventListener('click', e => { if (e.target === modal) closeEmergencyContactModal(); });
    document.body.appendChild(modal);
  }

  const user = getCurrentUser();
  if (user) loadEmergencyContact(user.username);

  document.getElementById('emergencyModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeEmergencyContactModal() {
  const modal = document.getElementById('emergencyModal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

function saveEmergencyContact() {
  const user = getCurrentUser();
  if (!user) return;

  const name = document.getElementById('ecName').value.trim();
  const relation = document.getElementById('ecRelation').value.trim();
  const phone = document.getElementById('ecPhone').value.trim();

  if (!name || !phone) {
    alert('Please fill in at least the contact name and phone number.');
    return;
  }

  const key = `mms_emergency_${user.username}`;
  localStorage.setItem(key, JSON.stringify({ name, relation, phone }));

  const msg = document.getElementById('ecMsg');
  if (msg) { msg.style.display = 'block'; }
  setTimeout(() => closeEmergencyContactModal(), 1200);
}

function loadEmergencyContact(username) {
  const key = `mms_emergency_${username}`;
  const saved = JSON.parse(localStorage.getItem(key) || 'null');
  if (!saved) return;

  const nameEl = document.getElementById('ecName');
  const relEl = document.getElementById('ecRelation');
  const phoneEl = document.getElementById('ecPhone');
  if (nameEl) nameEl.value = saved.name || '';
  if (relEl) relEl.value = saved.relation || '';
  if (phoneEl) phoneEl.value = saved.phone || '';
}
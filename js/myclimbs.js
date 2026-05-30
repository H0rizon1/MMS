const allClimbs = {
  kapig: {
    id: 'kapig',
    name: 'Mt. Kapigpiglatan',
    loc: 'Benguet',
    date: 'June 15–16, 2026',
    masl: '1,028 MASL',
    img: 'images/kapigpiglatan.jpg',
    desc: 'A beginner-friendly mountain perfect for first-time hikers. Features scenic grasslands and pine forests.',
  },
  pulag: {
    id: 'pulag',
    name: 'Mt. Pulag',
    loc: 'Benguet',
    date: 'July 20–22, 2026',
    masl: '2,922 MASL',
    img: 'images/pulag.jpg',
    desc: 'The third highest peak in the Philippines. Famous for its sea of clouds and stunning sunrise views.',
  },
  ulap: {
    id: 'ulap',
    name: 'Mt. Ulap',
    loc: 'Benguet',
    date: 'August 5–6, 2026',
    masl: '1,846 MASL',
    img: 'images/ulap.jpg',
    desc: 'Known for its Godzilla-like mountain ridges and rolling hills. Perfect for beginners.',
  },
};

const DEMO_REGISTERED_CLIMBS = [
  {
    climbId: 'kapig',
    status: 'confirmed',
    paymentStatus: 'paid',
    registeredAt: 'May 1, 2026',
  },
];
 
document.addEventListener('DOMContentLoaded', () => {
 
  // Auth guard
  const user = getCurrentUser();
  if (!user) { window.location.href = 'login.html'; return; }
  if (user.role === 'admin') { window.location.href = 'admin/dashboard.html'; return; }
 
  // Update welcome & nav
  document.getElementById('welcomeName').textContent = `Welcome back, ${user.fullName}!`;
  const navNameEl = document.getElementById('navUserName');
  if (navNameEl) navNameEl.textContent = user.fullName.split(' ')[0];
 
  // Logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', logout);
 
  // Render climbs
  renderClimbs(DEMO_REGISTERED_CLIMBS);
 
});
 
function renderClimbs(registeredClimbs) {
  const list = document.getElementById('climbsList');
  const emptyState = document.getElementById('emptyState');
 
  let upcoming = 0, confirmed = 0, pending = 0;
 
  if (!registeredClimbs || registeredClimbs.length === 0) {
    emptyState.style.display = 'flex';
    updateStats(0, 0, 0);
    return;
  }
 
  emptyState.style.display = 'none';
  list.innerHTML = '';
 
  registeredClimbs.forEach(reg => {
    const climb = allClimbs[reg.climbId];
    if (!climb) return;
 
    upcoming++;
    if (reg.status === 'confirmed') confirmed++;
    if (reg.paymentStatus === 'pending') pending++;
 
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
  document.getElementById('statUpcoming').textContent = upcoming;
  document.getElementById('statConfirmed').textContent = confirmed;
  document.getElementById('statPending').textContent = pending;
}
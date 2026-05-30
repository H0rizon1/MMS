const climbData = {
    kapig : {
        name: 'Mt. Kapigpiglatan',
        loc: 'Benguet',
        difficulty: 'Difficulty: 3/5',
        elevation: '1,028 MASL',
        schedule: 'June 15-16, 2026',
        location: 'Benguet',
        participants: '12/20',
        slotsPct: 60,
        bg: 'images/mtkapig.jpg',
        about: 'A beginner-friendly mountain perfect for first-time hikers. Features scenic grasslands and pine forests.',
        itinerary : {
            'Day 1': [
                '6:00 AM - Assembly point at MMS Office',
                '7:00 AM - ETD to Benguet',
                '12:00 PM - Lunch at jump-off',
                '1:00 PM - Start trek',
                '5:00 PM - Set up camp',
                '6:00 PM - Dinner and socials',
            ],
            'Day 2': [
                '5:00 AM - Wake up call',
                '6:00 AM - Summit assault',
                '8:00 AM - Breakfast at summit',
                '10:00 AM - Descend',
                '2:00 PM - Arrive at jump-off',
                '3:00 PM - ETD back to Manila',
            ],
        },
        water: ['Water source at campsite', 'Bring 2–3L for the trail'],
        bring: [
            'Backpack (40–50L)', 'Tent and sleeping bag',
            'Headlamp with extra batteries', 'Rain gear',
            'Personal medications', 'Trail food and snacks',
            'Water container (2–3L capacity)',
        ],
        expenses: [
            ['Transportation', '₱800'],
            ['Registration Fee', '₱500'],
            ['Guide Fee', '₱300'],
            ['Food', '₱600'],
            ['Miscellaneous', '₱300'],
        ],
        total: '₱2,500',
        officers: [
            { name: 'Juan Dela Cruz', role: 'Climb Leader', phone: '0917-123-4567' },
            { name: 'Maria Santos', role: 'Assistant Leader', phone: '0918-234-5678' },
        ],
    },

    pulag : {
        name: 'Mt. Pulag',
        loc: 'Benguet',
        difficulty: 'Difficulty: 3/5',
        elevation: '2,922 MASL',
        schedule: 'June 20-22, 2026',
        location: 'Benguet',
        participants: '18/25',
        slotsPct: 72,
        bg: 'images/pulag1.jpg',
        about: 'The third highest peak in the Philippines. Famous for its sea of clouds and stunning sunrise views.',
        itinerary : {
            'Day 1': [
                '5:00 AM - Assembly at MMS Office',
                '6:00 AM - ETD to Benguet',
                '2:00 PM - Arrive at ranger station',
                '3:00 PM - Start trek to campsite',
                '6:00 PM - Set up camp',
                '7:00 PM - Dinner and briefing',
            ],
            'Day 2': [
                '3:00 AM - Wake up call',
                '4:00 AM - Summit assault',
                '6:00 AM - Sunrise at summit',
                '8:00 AM - Descend',
                '12:00 PM - Lunch at campsite',
                '2:00 PM - Continue descent',
            ],
            'Day 3': [
               '6:00 AM - Final descent',
               '10:00 AM - Arrive at jump-off',
               '11:00 AM - ETD back to Manila',
            ],
        },
        water: ['Water source at campsite', 'Bring 3-4L for the summit assault'],
        bring: [
            'Backpack (50–60L)', 'Cold weather gear',
            'Headlamp with extra batteries', 'Rain gear',
            'Personal medications', 'High-energy trail food',
            'Water container (3–4L capacity)', 'Extra batteries',
        ],
        expenses: [
            ['Transportation', '₱1,200'],
            ['Registration Fee', '₱800'],
            ['Guide Fee', '₱500'],
            ['Food', '₱900'],
            ['Miscellaneous', '₱400'],
        ],
        total: '₱3,800',
        officers: [
            { name: 'Juan Dela Cruz', role: 'Climb Leader', phone: '0917-123-4567' },
            { name: 'Maria Santos', role: 'Assistant Leader', phone: '0918-234-5678' },
        ],
    },

    ulap : {
        name: 'Mt. Ulap',
        loc: 'Benguet',
        difficulty: 'Difficulty: 3/9',
        elevation: '1,846 MASL',
        schedule: 'August 5–6, 2026',
        location: 'Benguet',
        participants: '8/30',
        slotsPct: 27,
        bg: 'images/ulap1.jpg',
        about: 'Known for its Godzilla-like mountain ridges and rolling hills. Perfect for beginners who want a scenic adventure.',
        itinerary: {
            'Day 1': [
                '6:00 AM - Assembly at MMS Office',
                '7:00 AM - ETD to Benguet',
                '12:00 PM - Arrive at jump-off',
                '1:00 PM - Start trek',
                '5:00 PM - Set up camp at ridge',
                '6:30 PM - Dinner and socials',
            ],
            'Day 2': [
                '5:00 AM - Wake up and sunrise viewing',
                '7:00 AM - Breakfast',
                '8:00 AM - Continue trek and descend',
                '12:00 PM - Arrive at jump-off',
                '1:00 PM - ETD back to Manila',
            ],
        },
        water: ['Water source at campsite', 'Bring 2L for the trail'],
        bring: [
            'Backpack (40–50L)', 'Tent and sleeping bag',
            'Headlamp with extra batteries', 'Rain gear',
            'Personal medications', 'Trail food and snacks',
            'Water container (2L capacity)',
        ],
        expenses: [
            ['Transportation', '₱700'],
            ['Registration Fee', '₱400'],
            ['Guide Fee', '₱250'],
            ['Food', '₱500'],
            ['Miscellaneous', '₱250'],
        ],
        total: '₱2,100',
        officers: [
            { name: 'Paolo Mendoza', role: 'Climb Leader', phone: '0916-567-8901' },
            { name: 'Ana Garcia', role: 'Assistant Leader', phone: '0917-678-9012' },
        ],
    },
};

let currentModalClimbId = null;

function checkIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

function openClimbModal(id) {
    const d = climbData[id];
    if (!d) return;
    currentModalClimbId = id;

    document.getElementById('modalHeroBg').style.backgroundImage = `url('${d.bg}')`;
    document.getElementById('modalDifficulty').textContent = d.difficulty;
    document.getElementById('modalName').textContent = d.name;
    document.getElementById('modalLoc').textContent = d.loc;
    document.getElementById('modalElevation').textContent = d.elevation;

    document.getElementById('modalSchedule').textContent = d.schedule;
    document.getElementById('modalLocation').textContent = d.location;
    document.getElementById('modalElevationSidebar').textContent = d.elevation;
    document.getElementById('modalParticipants').textContent = d.participants;
    document.getElementById('modalSlotsPct').textContent = d.slotsPct + '%';
    document.getElementById('modalProgressFill').style.width = d.slotsPct + '%';

    document.getElementById('modalAbout').textContent = d.about;

    let itinHTML = '';
    for (const [day, items] of Object.entries(d.itinerary)) {
        itinHTML += `<div class="detail-day-title">${day}</div><ul class="detail-checklist">`;
        items.forEach(item => { itinHTML += `<li>${checkIcon()}${item}</li>`; });
        itinHTML += `</ul>`;
    }
    document.getElementById('modalItinerary').innerHTML = itinHTML;

    let waterHTML = '';
    d.water.forEach(w => { waterHTML += `<li>${checkIcon()}${w}</li>`; });
    document.getElementById('modalWater').innerHTML = waterHTML;

    let bringHTML = '';
    d.bring.forEach(b => { bringHTML += `<div class="detail-bring-item">${checkIcon()}${b}</div>`; });
    document.getElementById('modalBring').innerHTML = bringHTML;

    let expHTML = '';
    d.expenses.forEach(([label, amt]) => { expHTML += `<tr><td>${label}</td><td>${amt}</td></tr>`; });
    expHTML += `<tr class="total"><td>Total Estimate</td><td>${d.total}</td></tr>`;
    document.getElementById('modalExpenses').innerHTML = expHTML;

    let offHTML = '';
    d.officers.forEach(o => {
        offHTML += `
        <div class="detail-officer-card">
            <div class="detail-officer-name">${o.name}</div>
            <div class="detail-officer-role">${o.role}</div>
            <div class="detail-officer-phone">${o.phone}</div>
        </div>`;
    });
    document.getElementById('modalOfficers').innerHTML = offHTML;

    updateRegisterButton(id);

    const overlay = document.getElementById('climbModal');
    overlay.classList.add('active');
    overlay.scrollTop = 0;
    document.body.style.overflow = 'hidden';
}

function updateRegisterButton(climbId) {
    const btn = document.querySelector('.detail-register-btn');
    const note = document.querySelector('.detail-register-note');
    if (!btn) return;

    const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;

    if (!user) {
        btn.textContent = 'Login to Register';
        btn.onclick = () => { window.location.href = 'login.html'; };
        if (note) note.textContent = 'You need to login or sign up to register for this climb.';
        return;
    }

    if (user.role === 'admin') {
        btn.textContent = 'Admin View';
        btn.disabled = true;
        btn.style.opacity = '0.6';
        if (note) note.textContent = 'Admins cannot register as participants.';
        return;
    }

    const registrations = JSON.parse(localStorage.getItem('mms_registrations') || '[]');
    const alreadyRegistered = registrations.some(
        r => r.climbId === climbId && r.username === user.username
    );

    if (alreadyRegistered) {
        btn.textContent = '✓ Already Registered';
        btn.disabled = true;
        btn.style.background = '#4caf50';
        btn.onclick = null;
        if (note) note.textContent = 'You are registered for this climb. Check My Climbs for details.';
    } else {
        btn.textContent = 'Register for this Climb';
        btn.disabled = false;
        btn.style.background = '';
        btn.style.opacity = '';
        btn.onclick = () => registerForClimb(climbId);
        if (note) note.textContent = 'Secure your slot now before it fills up!';
    }
}

function registerForClimb(climbId) {
    const user = getCurrentUser();
    if (!user) { window.location.href = 'login.html'; return; }

    const registrations = JSON.parse(localStorage.getItem('mms_registrations') || '[]');

    // Guard against double registration
    const alreadyRegistered = registrations.some(
        r => r.climbId === climbId && r.username === user.username
    );
    if (alreadyRegistered) return;

    const newReg = {
        climbId,
        username: user.username,
        fullName: user.fullName,
        status: 'pending',
        paymentStatus: 'unpaid',
        registeredAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    };

    registrations.push(newReg);
    localStorage.setItem('mms_registrations', JSON.stringify(registrations));

    // Refresh button state
    updateRegisterButton(climbId);
}

function closeClimbModal() {
    document.getElementById('climbModal').classList.remove('active');
    document.body.style.overflow = '';
    currentModalClimbId = null;
}

document.getElementById('climbModal').addEventListener('click', function (e) {
    if (e.target === this) closeClimbModal();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeClimbModal();
});

const urlParams = new URLSearchParams(window.location.search);
const openId = urlParams.get('open');
if (openId && climbData[openId]) {
    setTimeout(() => openClimbModal(openId), 300);
}
document.addEventListener('DOMContentLoaded', () => {

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const user = getCurrentUser();
  const myClimbsLink = document.getElementById('myClimbsLink');
  const navAuth = document.querySelector('.nav-auth');
  const navUser = document.querySelector('.nav-user');

  if (user) {
    if (myClimbsLink) {
      myClimbsLink.style.display = 'block';
      const anchor = myClimbsLink.querySelector('a');
      if (anchor) anchor.href = 'myclimbs.html';
    }

    if (navAuth) {
      navAuth.outerHTML = `
        <div class="nav-user">
          <div class="nav-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke-linecap="round"/></svg>
          </div>
          <span>${user.fullName.split(' ')[0]}</span>
          <button class="nav-logout-btn" onclick="logout()">Logout</button>
        </div>`;
    }

    if (navUser) {
      const nameEl = navUser.querySelector('span');
      if (nameEl) nameEl.textContent = user.fullName.split(' ')[0];
      const logoutBtn = navUser.querySelector('#logoutBtn');
      if (logoutBtn) logoutBtn.addEventListener('click', logout);
    }

  } else {
    if (myClimbsLink) myClimbsLink.style.display = 'none';

    if (navUser && !navUser.querySelector('#logoutBtn')) {
      navUser.outerHTML = `
        <div class="nav-auth">
          <a href="login.html" class="nav-login">Login</a>
          <a href="signup.html" class="nav-signup">Sign Up</a>
        </div>`;
    }
  }

});
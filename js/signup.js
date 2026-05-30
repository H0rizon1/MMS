document.addEventListener('DOMContentLoaded', () => {

  const session = getSession();
  if (session) {
    window.location.href = 'home.html';
    return;
  }

  const fullNameInput   = document.getElementById('fullName');
  const emailInput      = document.getElementById('email');
  const usernameInput   = document.getElementById('username');
  const passwordInput   = document.getElementById('password');
  const confirmPwInput  = document.getElementById('confirmPassword');
  const signupBtn       = document.getElementById('signupBtn');
  const signupError     = document.getElementById('signupError');
  const signupSuccess   = document.getElementById('signupSuccess');
  const togglePw        = document.getElementById('togglePw');
  const toggleConfirmPw = document.getElementById('toggleConfirmPw');

  togglePw.addEventListener('click', () => {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  });
  toggleConfirmPw.addEventListener('click', () => {
    confirmPwInput.type = confirmPwInput.type === 'password' ? 'text' : 'password';
  });

  function showError(msg) {
    signupError.textContent = msg;
    signupError.classList.add('show');
    signupSuccess.classList.remove('show');
  }
  function showSuccess(msg) {
    signupSuccess.textContent = msg;
    signupSuccess.classList.add('show');
    signupError.classList.remove('show');
  }
  function clearMessages() {
    signupError.classList.remove('show');
    signupSuccess.classList.remove('show');
  }
  function setLoading(loading) {
    signupBtn.disabled = loading;
    signupBtn.innerHTML = loading
      ? 'Creating account...'
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg> Create Account`;
  }

  signupBtn.addEventListener('click', () => {
    clearMessages();

    const fullName  = fullNameInput.value.trim();
    const email     = emailInput.value.trim();
    const username  = usernameInput.value.trim();
    const password  = passwordInput.value;
    const confirmPw = confirmPwInput.value;

    if (!fullName)                        { showError('Please enter your full name.'); return; }
    if (!email || !email.includes('@'))   { showError('Please enter a valid email address.'); return; }
    if (!username || username.length < 3) { showError('Username must be at least 3 characters.'); return; }
    if (password.length < 6)             { showError('Password must be at least 6 characters.'); return; }
    if (password !== confirmPw)           { showError('Passwords do not match.'); return; }

    setLoading(true);

    const taken = Object.values(USERS).some(
      u => u.username.toLowerCase() === username.toLowerCase()
    );
    if (taken) {
      showError('That username is already taken.');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const newUser = { username, fullName, email, role: 'user' };
      saveSession(newUser, false);
      showSuccess('Account created! Redirecting...');
      setTimeout(() => { window.location.href = 'index.html'; }, 1200);
    }, 500);
  });

  [fullNameInput, emailInput, usernameInput, passwordInput, confirmPwInput].forEach(input => {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') signupBtn.click();
    });
  });

});
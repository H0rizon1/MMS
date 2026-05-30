document.addEventListener('DOMContentLoaded', () => {                                                                                                         

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

    const session = getSession();
  if (session) {
    window.location.href = session.role === 'admin' ? 'admin/dashboard.html' : 'home.html';
    return;
  }

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

    const builtInTaken = Object.values(USERS).some(
      u => u.username.toLowerCase() === username.toLowerCase()
    );
    if (builtInTaken) { showError("That username is already taken. Please choose another."); return; }

    const registeredUsers = JSON.parse(localStorage.getItem('mms_registered_users') || '[]');
    const alreadyExists = registeredUsers.some(
      u => u.username.toLowerCase() === username.toLowerCase()
    );
    if (alreadyExists) { showError('That username is already taken. Please choose another.'); return; }

    const newUser = {
      username,
      password,
      fullName,
      email,
      role: 'user',
    };
    registeredUsers.push(newUser);
    localStorage.setItem('mms_registered_users', JSON.stringify(registeredUsers));

    signupBtn.disabled = true;
    showSuccess("Account created! Redirecting to login...");
    setTimeout(() => { window.location.href = 'login.html'; }, 1500);
  });

  [fullNameInput, emailInput, usernameInput, passwordInput, confirmPwInput].forEach(input => {
    input.addEventListener('kaydown', e => { if (e.key === 'Enter') signupBtn.click(); });
  });
});
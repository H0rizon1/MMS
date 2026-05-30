document.addEventListener('DOMContentLoaded', () => {
    const session = getSession();
    if (session) {
        session.role === 'admin'
        ? window.location.href = 'dashboard.html'
        : window.location.href = 'home.html';
        return;
    }

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const rememberCheck = document.getElementById('remember');
    const loginBtn = document.getElementById('loginBtn');
    const loginError = document.getElementById('loginError');
    const togglePw = document.getElementById('togglePw');
    const forgotBtn = document.getElementById('forgotBtn');

    togglePw.addEventListener('click', () => {
        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password'; 
    });

    function showError(msg) {
        loginError.textContent = msg;
        loginError.classList.add('show');
    }
    function clearError() {
        loginError.classList.remove('show');
    }
    function setLoading(loading) {
        loginBtn.disabled = loading;
        loginBtn.innerHTML = loading
            ? 'Signing in...'
            : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 012
            2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" stroke-linecap="round" stroke-linejoin="round"/></svg> Login`;
    }

    loginBtn.addEventListener('click', () => {
        clearError();
        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (!username) { showError('Please enter your username.'); return; }
        if (!password) { showError('Please enter your password.'); return; }

        setLoading(true);

        const match = getAllUsers().find(
            u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
        );

        setTimeout(() => {
            if (!match) {
                showError('Incorrect username or password. Please try again.');
                setLoading(false);
                return;
            }
            saveSession(match, rememberCheck.checked);
            match.role === 'admin'
            ? window.location.href = 'admin/dashboard.html'
            : window.location.href = 'home.html';
        }, 500);
    });

    forgotBtn.addEventListener('click', () => {
        loginError.style.color = 'var(--green-dark)';
        loginError.textContent = 'Please contact an MMS admin to reset your password.';
        loginError.classList.add('show');
    });

    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('keydown', e => {
            if (e.key === 'Enter') loginBtn.click(); });
    });
});
const USERS = {
    admin: {
        username: 'Jena Ruanes',
        password: 'Admin123',
        fullName: 'Jena Ruanes',
        role: 'admin',
    },
    user: {
        username: 'Desiree Lagman',
        password: 'User123',
        fullName: 'Desiree Lagman',
        role: 'user',
    },
};

function saveSession(user, remember) {
    const storage = remember ? localStorage : sessionStorage;                                                                                                                                       
    storage.setItem('mms_user', JSON.stringify(user));
}

function getSession() {
    const data = localStorage.getItem('mms_user') || sessionStorage.getItem ('mms_user');
    return data ? JSON.parse(data) : null;
}

function clearSession() {
    localStorage.removeItem('mms_user');
    sessionStorage.removeItem('mms_user');
}

function isLoggedIn() {
    return getSession() !== null;
}

function getCurrentUser() {
    return getSession();
}

function logout() {
    clearSession();
    window.location.href = 'home.html';
}
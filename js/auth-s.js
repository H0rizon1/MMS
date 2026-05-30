const USERS = {
    admin: {
        username: 'jenaruanes',
        password: 'Admin123',
        fullName: 'Jena Ruanes',
        role: 'admin',
    },
    user: {
        username: 'desireeLagman',
        password: 'User123',
        fullName: 'Desiree Lagman',
        role: 'user',
    },
};

function getAllUsers() {                                                                                                                                                                                                                                        
    let registered = [];
    try {
        const raw = localStorage.getItem('mms_registered_users');
        const parsed = raw ? JSON.parse(raw) : [];
        registered = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        registered = [];
    }
    return [...Object.values(USERS), ...registered];
}

function saveSession(user, remember) {
    const storage = remember ? localStorage : sessionStorage;
    const { password, ...safeUser } = user;
    storage.setItem('mms_user', JSON.stringify(safeUser));
}

function getSession() {
    const data = localStorage.getItem('mms_user') || sessionStorage.getItem('mms_user');
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
    const isAdmin = window.location.pathname.includes('/admin/');
    if (isAdmin) {
        window.location.replace('../login.html');
    } else {
        window.location.replace('login.html');
    }
}
import { createContext, useContext, useState } from "react";

const USERS = [
  {
    username: "jenaruanes",
    password: "Admin123",
    fullName: "Jena Ruanes",
    role: "admin",
  },
  {
    username: "desireeLagman",
    password: "User123",
    fullName: "Desiree Lagman",
    role: "user",
  },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const data =
      localStorage.getItem("mms_user") ||
      sessionStorage.getItem("mms_user");
    return data ? JSON.parse(data) : null;
  });

  function getAllUsers() {
    let registered = [];
    try {
      const raw = localStorage.getItem("mms_registered_users");
      const parsed = raw ? JSON.parse(raw) : [];
      registered = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      registered = [];
    }
    return [...USERS, ...registered];
  }

  function login(username, password, remember) {
    const match = getAllUsers().find(
      (u) =>
        u.username.toLowerCase() === username.toLowerCase() &&
        u.password === password
    );
    if (!match) return false;

    const { password: _, ...safeUser } = match;
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem("mms_user", JSON.stringify(safeUser));
    setUser(safeUser);
    return true;
  }

  function signup(fullName, email, username, password) {
    const allUsers = getAllUsers();
    const taken = allUsers.some(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );
    if (taken) return { success: false, error: "Username already taken." };

    const newUser = { username, password, fullName, email, role: "user" };
    const registered = JSON.parse(
      localStorage.getItem("mms_registered_users") || "[]"
    );
    registered.push(newUser);
    localStorage.setItem("mms_registered_users", JSON.stringify(registered));
    return { success: true };
  }

  function logout() {
    localStorage.removeItem("mms_user");
    sessionStorage.removeItem("mms_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
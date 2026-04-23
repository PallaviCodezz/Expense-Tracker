import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import Layout from "./components/Layout.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Income from "./pages/Income.jsx";
import ExpensePage from "./pages/Expense.jsx";
import Profile from "./pages/Profile.jsx";

const API_BASE = "http://localhost:4000/api";

const getStoredAuth = () => {
  try {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const user = JSON.parse(
      localStorage.getItem("user") || sessionStorage.getItem("user") || "null"
    );
    return { token, user };
  } catch {
    return { token: null, user: null };
  }
};

const fetchProfile = async (token) => {
  const res = await axios.get(`${API_BASE}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data?.user || null;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authView, setAuthView] = useState("login"); // "login" | "signup"
  const [themeMode, setThemeMode] = useState(
    () => localStorage.getItem("themeMode") || "ocean"
  );

  useEffect(() => {
    const { token: storedToken, user: storedUser } = getStoredAuth();
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("theme-neon", themeMode === "neon");
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "ocean" ? "neon" : "ocean"));
  };

  const persistAuth = (userObj, tokenStr, remember = false) => {
    try {
      const storage = remember ? localStorage : sessionStorage;
      const other = remember ? sessionStorage : localStorage;
      if (userObj) storage.setItem("user", JSON.stringify(userObj));
      if (tokenStr) storage.setItem("token", tokenStr);
      other.removeItem("user");
      other.removeItem("token");
      setUser(userObj || null);
      setToken(tokenStr || null);
    } catch (err) {
      console.error("persistAuth error:", err);
    }
  };

  const handleLogin = async (email, password, remember = false) => {
    const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
    const { token: t, user: u } = res.data;
    persistAuth(u, t, remember);
  };

  const handleSignup = async (name, email, password, remember = false) => {
    const res = await axios.post(`${API_BASE}/auth/signup`, { name, email, password });
    const { token: t, user: u } = res.data;
    persistAuth(u, t, remember);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !token) {
    return (
      <div>
        {authView === "login" ? (
          <Login
            onLogin={handleLogin}
            onSwitchToSignup={() => setAuthView("signup")}
            themeMode={themeMode}
            onToggleTheme={toggleTheme}
          />
        ) : (
          <Signup
            onSignup={handleSignup}
            onSwitchToLogin={() => setAuthView("login")}
            persistAuth={persistAuth}
            fetchProfile={fetchProfile}
            themeMode={themeMode}
            onToggleTheme={toggleTheme}
          />
        )}
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              user={user}
              token={token}
              onLogout={handleLogout}
              themeMode={themeMode}
              onToggleTheme={toggleTheme}
            />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="income" element={<Income />} />
          <Route path="expense" element={<ExpensePage />} />
          <Route
            path="profile"
            element={
              <Profile
                user={user}
                onUpdateProfile={(updated) => setUser(updated)}
                onLogout={handleLogout}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

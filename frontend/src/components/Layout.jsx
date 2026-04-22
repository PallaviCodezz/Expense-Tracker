import React, { useState, useMemo, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

const API_BASE = "http://localhost:4000/api";

const safeArrayFromResponse = (res) => {
  const body = res?.data;
  if (!body) return [];
  if (Array.isArray(body)) return body;
  if (Array.isArray(body.data)) return body.data;
  if (Array.isArray(body.incomes)) return body.incomes;
  if (Array.isArray(body.expenses)) return body.expenses;
  return [];
};

const filterTransactions = (transactions, frame) => {
  const now = new Date();
  const today = new Date(now).setHours(0, 0, 0, 0);
  switch (frame) {
    case "daily":
      return transactions.filter((t) => new Date(t.date) >= today);
    case "weekly": {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      return transactions.filter((t) => new Date(t.date) >= startOfWeek);
    }
    case "monthly":
      return transactions.filter(
        (t) => new Date(t.date).getMonth() === now.getMonth()
      );
    default:
      return transactions;
  }
};

const Layout = ({ user, token, onLogout, themeMode, onToggleTheme }) => {
  const [transactions, setTransactions] = useState([]);
  const [timeFrame, setTimeFrame] = useState("monthly");
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const location = useLocation();

  const getHeaders = () => {
    const t = token || localStorage.getItem("token") || sessionStorage.getItem("token");
    return t ? { Authorization: `Bearer ${t}` } : {};
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const [incomeRes, expenseRes] = await Promise.all([
        axios.get(`${API_BASE}/income/get`, { headers: getHeaders() }),
        axios.get(`${API_BASE}/expense/get`, { headers: getHeaders() }),
      ]);

      const incomes = safeArrayFromResponse(incomeRes).map((i) => ({ ...i, type: "income" }));
      const expenses = safeArrayFromResponse(expenseRes).map((e) => ({ ...e, type: "expense" }));

      const all = [...incomes, ...expenses]
        .map((t) => ({
          id: t._id || t.id || Math.random().toString(36).slice(2),
          description: t.description || "",
          amount: Number(t.amount) || 0,
          date: t.date || t.createdAt || new Date().toISOString(),
          category: t.category || "Other",
          type: t.type,
          raw: t,
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      setTransactions(all);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to fetch transactions", err?.response || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredTransactions = useMemo(
    () => filterTransactions(transactions, timeFrame),
    [transactions, timeFrame]
  );

  const outletContext = {
    transactions: filteredTransactions,
    refreshTransactions: fetchTransactions,
    timeFrame,
    setTimeFrame,
    lastUpdated,
  };

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar
        user={user}
        onLogout={onLogout}
        themeMode={themeMode}
        onToggleTheme={onToggleTheme}
      />
      <div className="flex">
        <Sidebar
          isCollapsed={sidebarCollapsed}
          setIsCollapsed={setSidebarCollapsed}
          user={user}
          onLogout={onLogout}
        />
        <main
          className={`flex-1 p-4 pt-6 transition-all duration-300 ${
            sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 14, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.995 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <Outlet context={outletContext} />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Layout;

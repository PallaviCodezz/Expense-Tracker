import React, { useState, useMemo, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid,
} from "recharts";
import {
  DollarSign, TrendingUp, TrendingDown, PiggyBank,
  ChevronDown, ChevronUp, Plus, PieChart as PieChartIcon,
} from "lucide-react";
import axios from "axios";
import GaugeCard from "../components/GaugeCard.jsx";
import TimeFrameSelector from "../components/TimeFrame.jsx";
import AddTransactionModal from "../components/Add.jsx";
import { getTimeFrameRange, getPreviousTimeFrameRange } from "../components/Helpers.jsx";
import {
  COLORS, GAUGE_COLORS,
  INCOME_CATEGORY_ICONS, EXPENSE_CATEGORY_ICONS,
} from "../assets/color.jsx";
import { dashboardStyles, chartStyles } from "../assets/dummyStyles.js";

const API_BASE = "http://localhost:4000/api";

const calculateData = (transactions) => ({
  income: transactions.filter((t) => t.type === "income").reduce((s, t) => s + Number(t.amount), 0),
  expenses: transactions.filter((t) => t.type === "expense").reduce((s, t) => s + Number(t.amount), 0),
});

const buildTrendData = (transactions) => {
  const grouped = {};
  transactions.forEach((t) => {
    const d = new Date(t.date);
    const key = `${d.getMonth() + 1}/${d.getDate()}`;
    if (!grouped[key]) grouped[key] = { label: key, income: 0, expense: 0 };
    if (t.type === "income") grouped[key].income += Number(t.amount) || 0;
    if (t.type === "expense") grouped[key].expense += Number(t.amount) || 0;
  });
  return Object.values(grouped)
    .slice(-10)
    .map((row) => ({ ...row, balance: row.income - row.expense }));
};

const AnimatedValue = ({ value, prefix = "", suffix = "", decimals = 0, className = "" }) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const target = Number(value) || 0;
    let current = 0;
    const duration = 700;
    const steps = 36;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      const done = Math.abs(current) >= Math.abs(target);
      setDisplay(done ? target : current);
      if (done) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className={className}>
      {prefix}
      {Number(display).toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
};

function toIsoWithClientTime(dateValue) {
  if (!dateValue) return new Date().toISOString();
  if (typeof dateValue === "string" && dateValue.length === 10) {
    const now = new Date();
    const hhmmss = now.toTimeString().slice(0, 8);
    return new Date(`${dateValue}T${hhmmss}`).toISOString();
  }
  try { return new Date(dateValue).toISOString(); } catch { return new Date().toISOString(); }
}

const Dashboard = () => {
  const {
    transactions: outletTransactions = [],
    timeFrame = "monthly",
    setTimeFrame = () => {},
    refreshTransactions,
  } = useOutletContext();

  const [showModal, setShowModal] = useState(false);
  const [gaugeData, setGaugeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [overviewMeta, setOverviewMeta] = useState({});
  const [activePieIndex, setActivePieIndex] = useState(-1);
  const [showAllIncome, setShowAllIncome] = useState(false);
  const [showAllExpense, setShowAllExpense] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    date: new Date().toISOString().split("T")[0],
    description: "",
    amount: "",
    type: "expense",
    category: "Food",
  });

  const timeFrameRange = useMemo(() => getTimeFrameRange(timeFrame), [timeFrame]);
  const prevTimeFrameRange = useMemo(() => getPreviousTimeFrameRange(timeFrame), [timeFrame]);

  const isDateInRange = (date, start, end) => {
    const d = new Date(date);
    const s = new Date(start); s.setHours(0, 0, 0, 0);
    const e = new Date(end); e.setHours(23, 59, 59, 999);
    return d >= s && d <= e;
  };

  const filteredTransactions = useMemo(
    () => outletTransactions.filter((t) => isDateInRange(t.date, timeFrameRange.start, timeFrameRange.end)),
    [outletTransactions, timeFrameRange]
  );

  const prevFilteredTransactions = useMemo(
    () => outletTransactions.filter((t) => isDateInRange(t.date, prevTimeFrameRange.start, prevTimeFrameRange.end)),
    [outletTransactions, prevTimeFrameRange]
  );

  const currentData = useMemo(() => {
    const d = calculateData(filteredTransactions);
    return { ...d, savings: d.income - d.expenses };
  }, [filteredTransactions]);

  const prevData = useMemo(() => {
    const d = calculateData(prevFilteredTransactions);
    return { ...d, savings: d.income - d.expenses };
  }, [prevFilteredTransactions]);

  useEffect(() => {
    const maxValues = {
      income: Math.max(currentData.income, 5000),
      expenses: Math.max(currentData.expenses, 3000),
      savings: Math.max(Math.abs(currentData.savings), 2000),
    };
    setGaugeData([
      { name: "Income", value: currentData.income, max: maxValues.income },
      { name: "Spent", value: currentData.expenses, max: maxValues.expenses },
      { name: "Savings", value: currentData.savings, max: maxValues.savings },
    ]);
  }, [currentData]);

  const fetchDashboardOverview = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const res = await axios.get(`${API_BASE}/dashboard/overview`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        params: { range: timeFrame },
      });
      if (res.data?.success) {
        const data = res.data.data;
        setOverviewMeta({
          monthlyIncome: Number(data.monthlyIncome || 0),
          monthlyExpense: Number(data.monthlyExpense || 0),
          savings: Number(data.savings || 0),
          savingsRate: data.savingsRate,
          expenseDistribution: data.expenseDistribution || [],
          recentTransactions: (data.recentTransactions || []).map((item) => ({
            id: item._id || item.id,
            date: item.date ? new Date(item.date).toISOString() : new Date().toISOString(),
            description: item.description || "",
            amount: Number(item.amount) || 0,
            type: item.type,
            category: item.category || "Other",
          })),
        });
      }
    } catch (err) {
      console.error("Dashboard overview error:", err?.response || err.message);
    }
  };

  useEffect(() => {
    fetchDashboardOverview();
  }, [timeFrame]);

  const displayIncome = timeFrame === "monthly" && typeof overviewMeta.monthlyIncome === "number"
    ? overviewMeta.monthlyIncome : currentData.income;
  const displayExpenses = timeFrame === "monthly" && typeof overviewMeta.monthlyExpense === "number"
    ? overviewMeta.monthlyExpense : currentData.expenses;
  const displaySavings = timeFrame === "monthly" && typeof overviewMeta.savings === "number"
    ? overviewMeta.savings : currentData.savings;

  const financialOverviewData = useMemo(() => {
    if (overviewMeta.expenseDistribution?.length > 0) {
      return overviewMeta.expenseDistribution.map((d) => ({ name: d.category, value: Math.round(Number(d.amount) || 0) }));
    }
    const cats = {};
    filteredTransactions.forEach((t) => {
      if (t.type === "expense") cats[t.category] = (cats[t.category] || 0) + t.amount;
    });
    return Object.entries(cats).map(([name, value]) => ({ name, value: Math.round(value) }));
  }, [filteredTransactions, overviewMeta]);

  const trendData = useMemo(
    () => buildTrendData(filteredTransactions),
    [filteredTransactions]
  );

  const topExpenseCategory = useMemo(() => {
    if (!financialOverviewData.length) return "No data";
    return financialOverviewData.reduce((a, b) => (a.value > b.value ? a : b)).name;
  }, [financialOverviewData]);

  const incomeTransactions = useMemo(
    () => filteredTransactions.filter((t) => t.type === "income").sort((a, b) => new Date(b.date) - new Date(a.date)),
    [filteredTransactions]
  );
  const expenseTransactions = useMemo(
    () => filteredTransactions.filter((t) => t.type === "expense").sort((a, b) => new Date(b.date) - new Date(a.date)),
    [filteredTransactions]
  );

  const displayedIncome = showAllIncome ? incomeTransactions : incomeTransactions.slice(0, 3);
  const displayedExpense = showAllExpense ? expenseTransactions : expenseTransactions.slice(0, 3);

  const handleAddTransaction = async () => {
    if (!newTransaction.description || !newTransaction.amount) return;
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const endpoint = newTransaction.type === "income" ? "income/add" : "expense/add";
      await axios.post(`${API_BASE}/${endpoint}`, {
        description: newTransaction.description.trim(),
        amount: parseFloat(newTransaction.amount),
        category: newTransaction.category,
        date: toIsoWithClientTime(newTransaction.date),
      }, { headers: { Authorization: `Bearer ${token}` } });
      await refreshTransactions();
      await fetchDashboardOverview();
      setNewTransaction({ date: new Date().toISOString().split("T")[0], description: "", amount: "", type: "expense", category: "Food" });
      setShowModal(false);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={dashboardStyles.container}>
      {/* Header */}
      <div className={dashboardStyles.headerContainer}>
        <div className={dashboardStyles.headerContent}>
          <div>
            <h1 className={dashboardStyles.headerTitle}>Dashboard</h1>
            <p className={dashboardStyles.headerSubtitle}>Your financial overview</p>
          </div>
          <button onClick={() => setShowModal(true)} className={dashboardStyles.addButton}>
            <Plus className="w-5 h-5" /> Add Transaction
          </button>
        </div>
        <div className={dashboardStyles.timeFrameContainer}>
          <TimeFrameSelector
            timeFrame={timeFrame}
            setTimeFrame={setTimeFrame}
            options={["daily", "weekly", "monthly", "yearly"]}
            color="teal"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className={dashboardStyles.summaryGrid}>
        <motion.div whileHover={{ y: -6, scale: 1.01 }} className="bg-[#0f1c33]/95 rounded-xl p-5 shadow-sm border border-cyan-900/40 border-l-4 border-l-cyan-400">
          <div className="flex items-center gap-3 mb-2">
            <div className={dashboardStyles.walletIconContainer}><TrendingUp className="w-5 h-5 text-teal-600" /></div>
            <span className="text-sm text-cyan-100/70">Total Income</span>
          </div>
          <p className="text-2xl font-bold text-cyan-50">
            <AnimatedValue value={displayIncome} prefix="$" />
          </p>
          <p className="text-xs text-cyan-100/70 mt-2">{timeFrameRange.label}</p>
        </motion.div>

        <motion.div whileHover={{ y: -6, scale: 1.01 }} className="bg-[#0f1c33]/95 rounded-xl p-5 shadow-sm border border-cyan-900/40 border-l-4 border-l-orange-400">
          <div className="flex items-center gap-3 mb-2">
            <div className={dashboardStyles.arrowDownIconContainer}><TrendingDown className="w-5 h-5 text-orange-600" /></div>
            <span className="text-sm text-cyan-100/70">Total Expenses</span>
          </div>
          <p className="text-2xl font-bold text-cyan-50">
            <AnimatedValue value={displayExpenses} prefix="$" />
          </p>
          <p className="text-xs text-cyan-100/70 mt-2">{timeFrameRange.label}</p>
        </motion.div>

        <motion.div whileHover={{ y: -6, scale: 1.01 }} className="bg-[#0f1c33]/95 rounded-xl p-5 shadow-sm border border-cyan-900/40 border-l-4 border-l-teal-400">
          <div className="flex items-center gap-3 mb-2">
            <div className={dashboardStyles.piggyBankIconContainer}><PiggyBank className="w-5 h-5 text-cyan-600" /></div>
            <span className="text-sm text-cyan-100/70">Savings</span>
          </div>
          <p className={`text-2xl font-bold ${displaySavings >= 0 ? "text-cyan-50" : "text-red-400"}`}>
            <AnimatedValue value={displaySavings} prefix="$" />
          </p>
          <p className="text-xs text-cyan-100/70 mt-2">{timeFrameRange.label}</p>
        </motion.div>
      </div>

      {/* Insights and Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <div className="glass-panel rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider text-cyan-200/70">Top expense category</p>
          <p className="font-display text-2xl text-cyan-50 mt-2">{topExpenseCategory}</p>
          <p className="text-sm text-cyan-100/70 mt-2">Focus here to improve savings quickly.</p>
        </div>
        <div className="glass-panel rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider text-cyan-200/70">Savings rate</p>
          <p className="font-display text-2xl text-cyan-50 mt-2">
            {typeof overviewMeta.savingsRate === "number" ? (
              <AnimatedValue value={overviewMeta.savingsRate} suffix="%" decimals={1} />
            ) : "N/A"}
          </p>
          <p className="text-sm text-cyan-100/70 mt-2">Calculated from current timeframe totals.</p>
        </div>
        <div className="glass-panel rounded-2xl p-5">
          <p className="text-xs uppercase tracking-wider text-cyan-200/70">Records in range</p>
          <p className="font-display text-2xl text-cyan-50 mt-2">
            <AnimatedValue value={filteredTransactions.length} />
          </p>
          <p className="text-sm text-cyan-100/70 mt-2">Income + expense entries in selected period.</p>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-5 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl text-cyan-50">Cashflow Trend</h3>
          <span className="text-xs text-cyan-100/70">{timeFrameRange.label}</span>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fb923c" stopOpacity={0.38} />
                  <stop offset="95%" stopColor="#fb923c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(158,186,210,0.2)" />
              <XAxis dataKey="label" stroke="#9ebad2" />
              <YAxis stroke="#9ebad2" />
              <Tooltip
                cursor={{ stroke: "rgba(34,211,238,0.45)", strokeWidth: 1 }}
                contentStyle={{
                  background: "rgba(8, 20, 39, 0.96)",
                  border: "1px solid rgba(34, 211, 238, 0.65)",
                  borderRadius: "12px",
                  boxShadow: "0 0 20px rgba(34,211,238,0.28)",
                  color: "#dff8ff",
                }}
              />
              <Area type="monotone" dataKey="income" stroke="#22d3ee" fill="url(#incomeFill)" strokeWidth={2.5} />
              <Area type="monotone" dataKey="expense" stroke="#fb923c" fill="url(#expenseFill)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gauge Cards */}
      <div className={dashboardStyles.gaugeGrid}>
        {gaugeData.map((gauge) => (
          <GaugeCard
            key={gauge.name}
            gauge={gauge}
            colorInfo={GAUGE_COLORS[gauge.name] || {}}
            timeFrameLabel={timeFrameRange.label}
            highlightNegative={gauge.name === "Savings"}
          />
        ))}
      </div>

      {/* Pie Chart */}
      <div className={dashboardStyles.pieChartContainer}>
        <div className={dashboardStyles.pieChartHeader}>
          <h3 className={dashboardStyles.pieChartTitle}>
            <PieChartIcon className="w-6 h-6 text-teal-500" />
            Expense Distribution
            <span className={dashboardStyles.listSubtitle}> ({timeFrameRange.label})</span>
          </h3>
        </div>
        <div className={dashboardStyles.pieChartHeight}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart className={chartStyles.pieChart}>
              <Pie
                data={financialOverviewData}
                cx="50%" cy="50%"
                innerRadius={70} outerRadius={110}
                paddingAngle={2} dataKey="value"
                label={({ name, percent }) => `${name}: ${Math.round(percent * 100)}%`}
                labelLine={false}
                onMouseEnter={(_, index) => setActivePieIndex(index)}
                onMouseLeave={() => setActivePieIndex(-1)}
                isAnimationActive
                animationDuration={650}
              >
                {financialOverviewData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke={activePieIndex === index ? "#67e8f9" : "#fff"}
                    strokeWidth={activePieIndex === index ? 3 : 2}
                    opacity={activePieIndex === -1 || activePieIndex === index ? 1 : 0.55}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`$${Math.round(value).toLocaleString()}`, "Amount"]}
                contentStyle={{
                  ...dashboardStyles.tooltipContent,
                  border: "1px solid rgba(34, 211, 238, 0.65)",
                  boxShadow: "0 0 22px rgba(34,211,238,0.3)",
                  color: "#dff8ff",
                }}
              />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" iconSize={10} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transaction Lists */}
      <div className={dashboardStyles.listsGrid}>
        {/* Income */}
        <div className={dashboardStyles.listContainer}>
          <div className={dashboardStyles.listHeader}>
            <h3 className={dashboardStyles.listTitle}>
              <TrendingUp className="w-6 h-6 text-green-500" /> Recent Income
              <span className={dashboardStyles.listSubtitle}> ({timeFrameRange.label})</span>
            </h3>
            <span className={dashboardStyles.incomeCountBadge}>{incomeTransactions.length} records</span>
          </div>
          <div className={dashboardStyles.transactionList}>
            {displayedIncome.map((t) => (
              <div key={t.id} className={dashboardStyles.incomeTransactionItem}>
                <div className={dashboardStyles.transactionContent}>
                  <div className={dashboardStyles.incomeIconContainer}>
                    {INCOME_CATEGORY_ICONS[t.category] || INCOME_CATEGORY_ICONS.Other}
                  </div>
                  <div>
                    <p className={dashboardStyles.transactionDescription}>{t.description}</p>
                    <p className={dashboardStyles.transactionCategory}>{t.category}</p>
                  </div>
                </div>
                <div className={dashboardStyles.transactionAmount}>
                  <p className={dashboardStyles.incomeAmount}>+${Math.abs(t.amount).toLocaleString()}</p>
                  <p className={dashboardStyles.transactionDate}>{new Date(t.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            {incomeTransactions.length === 0 && (
              <div className={dashboardStyles.emptyState}>
                <div className={dashboardStyles.emptyIconContainer("bg-green-50")}>
                  <DollarSign className="w-8 h-8 text-green-400" />
                </div>
                <p className={dashboardStyles.emptyText}>No income transactions</p>
              </div>
            )}
            {incomeTransactions.length > 3 && (
              <div className={dashboardStyles.viewAllContainer}>
                <button onClick={() => setShowAllIncome(!showAllIncome)} className={dashboardStyles.viewAllButton}>
                  {showAllIncome ? <><ChevronUp className="w-5 h-5" /> Show Less</> : <><ChevronDown className="w-5 h-5" /> View All ({incomeTransactions.length})</>}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Expenses */}
        <div className={dashboardStyles.listContainer}>
          <div className={dashboardStyles.listHeader}>
            <h3 className={dashboardStyles.listTitle}>
              <TrendingDown className="w-6 h-6 text-orange-500" /> Recent Expenses
              <span className={dashboardStyles.listSubtitle}> ({timeFrameRange.label})</span>
            </h3>
            <span className={dashboardStyles.expenseCountBadge}>{expenseTransactions.length} records</span>
          </div>
          <div className={dashboardStyles.transactionList}>
            {displayedExpense.map((t) => (
              <div key={t.id} className={dashboardStyles.expenseTransactionItem}>
                <div className={dashboardStyles.transactionContent}>
                  <div className={dashboardStyles.expenseIconContainer}>
                    {EXPENSE_CATEGORY_ICONS[t.category] || EXPENSE_CATEGORY_ICONS.Other}
                  </div>
                  <div>
                    <p className={dashboardStyles.transactionDescription}>{t.description}</p>
                    <p className={dashboardStyles.transactionCategory}>{t.category}</p>
                  </div>
                </div>
                <div className={dashboardStyles.transactionAmount}>
                  <p className={dashboardStyles.expenseAmount}>-${Math.abs(t.amount).toLocaleString()}</p>
                  <p className={dashboardStyles.transactionDate}>{new Date(t.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            {expenseTransactions.length === 0 && (
              <div className={dashboardStyles.emptyState}>
                <div className={dashboardStyles.emptyIconContainer("bg-orange-50")}>
                  <DollarSign className="w-8 h-8 text-orange-400" />
                </div>
                <p className={dashboardStyles.emptyText}>No expense transactions</p>
              </div>
            )}
            {expenseTransactions.length > 3 && (
              <div className={dashboardStyles.viewAllContainer}>
                <button onClick={() => setShowAllExpense(!showAllExpense)} className={dashboardStyles.viewAllButton}>
                  {showAllExpense ? <><ChevronUp className="w-5 h-5" /> Show Less</> : <><ChevronDown className="w-5 h-5" /> View All ({expenseTransactions.length})</>}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AddTransactionModal
        showModal={showModal}
        setShowModal={setShowModal}
        newTransaction={newTransaction}
        setNewTransaction={setNewTransaction}
        handleAddTransaction={handleAddTransaction}
        loading={loading}
        type="both"
        title="Add Transaction"
        buttonText="Add"
        categories={["Food", "Housing", "Transport", "Shopping", "Entertainment", "Utilities", "Healthcare", "Salary", "Freelance", "Investment", "Bonus", "Other"]}
        color="teal"
      />
    </div>
  );
};

export default Dashboard;

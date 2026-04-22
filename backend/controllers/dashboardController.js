import Income from "../models/incomeModel.js";
import Expense from "../models/expenseModel.js";
import getDateRange from "../utils/dateFilter.js";

// GET /api/dashboard/overview?range=monthly
export const getDashboardOverview = async (req, res) => {
  try {
    const range = req.query.range || "monthly";
    const { start, end } = getDateRange(range);
    const userId = req.user._id;

    const [incomes, expenses] = await Promise.all([
      Income.find({ userId, date: { $gte: start, $lte: end } }).sort({ date: -1 }),
      Expense.find({ userId, date: { $gte: start, $lte: end } }).sort({ date: -1 }),
    ]);

    const monthlyIncome = incomes.reduce((acc, cur) => acc + Number(cur.amount || 0), 0);
    const monthlyExpense = expenses.reduce((acc, cur) => acc + Number(cur.amount || 0), 0);
    const savings = monthlyIncome - monthlyExpense;
    const savingsRate = monthlyIncome === 0 ? 0 : Math.round((savings / monthlyIncome) * 100);

    const recentTransactions = [
      ...incomes.map((i) => ({ ...i.toObject(), type: "income" })),
      ...expenses.map((e) => ({ ...e.toObject(), type: "expense" })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

    const spendByCategory = {};
    for (const exp of expenses) {
      const cat = exp.category || "Other";
      spendByCategory[cat] = (spendByCategory[cat] || 0) + Number(exp.amount || 0);
    }

    const expenseDistribution = Object.entries(spendByCategory).map(([category, amount]) => ({
      category,
      amount,
      percent: monthlyExpense === 0 ? 0 : Math.round((amount / monthlyExpense) * 100),
    }));

    res.json({
      success: true,
      data: {
        monthlyIncome,
        monthlyExpense,
        savings,
        savingsRate,
        recentTransactions,
        spendByCategory,
        expenseDistribution,
        range,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

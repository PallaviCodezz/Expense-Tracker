import Expense from "../models/expenseModel.js";
import getDateRange from "../utils/dateFilter.js";
import xlsx from "xlsx";

// GET /api/expense/get
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id }).sort({ date: -1 });
    res.json({ success: true, data: expenses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/expense/add
export const addExpense = async (req, res) => {
  try {
    const { description, amount, category, date } = req.body;

    if (!description || !amount || !category || !date) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const expense = await Expense.create({
      description,
      amount: Number(amount),
      category,
      date: new Date(date),
      userId: req.user._id,
    });

    res.status(201).json({ success: true, data: expense });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/expense/update/:id
export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, userId: req.user._id });
    if (!expense) return res.status(404).json({ success: false, message: "Expense not found" });

    const { description, amount, category, date } = req.body;
    if (description) expense.description = description;
    if (amount) expense.amount = Number(amount);
    if (category) expense.category = category;
    if (date) expense.date = new Date(date);

    await expense.save();
    res.json({ success: true, data: expense });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/expense/delete/:id
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!expense) return res.status(404).json({ success: false, message: "Expense not found" });
    res.json({ success: true, message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/expense/overview?range=monthly
export const getExpenseOverview = async (req, res) => {
  try {
    const range = req.query.range || "monthly";
    const { start, end } = getDateRange(range);

    const expenses = await Expense.find({
      userId: req.user._id,
      date: { $gte: start, $lte: end },
    }).sort({ date: -1 });

    const totalExpense = expenses.reduce((acc, cur) => acc + cur.amount, 0);
    const averageExpense = expenses.length > 0 ? totalExpense / expenses.length : 0;
    const numberOfTransactions = expenses.length;
    const recentTransactions = expenses.slice(0, 9);

    res.json({
      success: true,
      data: { totalExpense, averageExpense, numberOfTransactions, recentTransactions, range },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/expense/downloadexcel
export const downloadExpenseExcel = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id }).sort({ date: -1 });

    const data = expenses.map((e) => ({
      Date: new Date(e.date).toLocaleDateString(),
      Description: e.description,
      Category: e.category,
      Amount: e.amount,
      Type: "Expense",
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expenses");

    const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });

    res.setHeader("Content-Disposition", 'attachment; filename="expense_details.xlsx"');
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

import Income from "../models/incomeModel.js";
import getDateRange from "../utils/dateFilter.js";
import xlsx from "xlsx";

// GET /api/income/get
export const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user._id }).sort({ date: -1 });
    res.json({ success: true, data: incomes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/income/add
export const addIncome = async (req, res) => {
  try {
    const { description, amount, category, date } = req.body;

    if (!description || !amount || !category || !date) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const income = await Income.create({
      description,
      amount: Number(amount),
      category,
      date: new Date(date),
      userId: req.user._id,
    });

    res.status(201).json({ success: true, data: income });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/income/update/:id
export const updateIncome = async (req, res) => {
  try {
    const income = await Income.findOne({ _id: req.params.id, userId: req.user._id });
    if (!income) return res.status(404).json({ success: false, message: "Income not found" });

    const { description, amount, category, date } = req.body;
    if (description) income.description = description;
    if (amount) income.amount = Number(amount);
    if (category) income.category = category;
    if (date) income.date = new Date(date);

    await income.save();
    res.json({ success: true, data: income });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/income/delete/:id
export const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!income) return res.status(404).json({ success: false, message: "Income not found" });
    res.json({ success: true, message: "Income deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/income/overview?range=monthly
export const getIncomeOverview = async (req, res) => {
  try {
    const range = req.query.range || "monthly";
    const { start, end } = getDateRange(range);

    const incomes = await Income.find({
      userId: req.user._id,
      date: { $gte: start, $lte: end },
    }).sort({ date: -1 });

    const totalIncome = incomes.reduce((acc, cur) => acc + cur.amount, 0);
    const averageIncome = incomes.length > 0 ? totalIncome / incomes.length : 0;
    const numberOfTransactions = incomes.length;
    const recentTransactions = incomes.slice(0, 9);

    res.json({
      success: true,
      data: { totalIncome, averageIncome, numberOfTransactions, recentTransactions, range },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/income/downloadexcel
export const downloadIncomeExcel = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user._id }).sort({ date: -1 });

    const data = incomes.map((i) => ({
      Date: new Date(i.date).toLocaleDateString(),
      Description: i.description,
      Category: i.category,
      Amount: i.amount,
      Type: "Income",
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");

    const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });

    res.setHeader("Content-Disposition", 'attachment; filename="income_details.xlsx"');
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

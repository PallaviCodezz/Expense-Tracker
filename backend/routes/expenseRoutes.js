import express from "express";
import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  getExpenseOverview,
  downloadExpenseExcel,
} from "../controllers/expenseController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/get", getExpenses);
router.post("/add", addExpense);
router.put("/update/:id", updateExpense);
router.delete("/delete/:id", deleteExpense);
router.get("/overview", getExpenseOverview);
router.get("/downloadexcel", downloadExpenseExcel);

export default router;

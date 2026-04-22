import express from "express";
import {
  getIncomes,
  addIncome,
  updateIncome,
  deleteIncome,
  getIncomeOverview,
  downloadIncomeExcel,
} from "../controllers/incomeController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/get", getIncomes);
router.post("/add", addIncome);
router.put("/update/:id", updateIncome);
router.delete("/delete/:id", deleteIncome);
router.get("/overview", getIncomeOverview);
router.get("/downloadexcel", downloadIncomeExcel);

export default router;

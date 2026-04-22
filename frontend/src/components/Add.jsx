import React from "react";
import { X } from "lucide-react";
import { modalStyles } from "../assets/dummyStyles.js";

const AddTransactionModal = ({
  showModal,
  setShowModal,
  newTransaction,
  setNewTransaction,
  handleAddTransaction,
  loading = false,
  type = "both",
  title = "Add New Transaction",
  buttonText = "Add Transaction",
  categories = ["Food", "Housing", "Transport", "Shopping", "Entertainment", "Utilities", "Healthcare", "Salary", "Freelance", "Investment", "Bonus", "Other"],
  color = "teal",
}) => {
  if (!showModal) return null;

  const today = new Date().toISOString().split("T")[0];
  const minDate = `${new Date().getFullYear()}-01-01`;
  const colorClass = modalStyles.colorClasses[color] || modalStyles.colorClasses.teal;

  return (
    <div className={modalStyles.overlay}>
      <div className={modalStyles.modalContainer}>
        <div className={modalStyles.modalHeader}>
          <h2 className={modalStyles.modalTitle}>{title}</h2>
          <button onClick={() => setShowModal(false)} className={modalStyles.closeButton}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className={modalStyles.form}>
          {type === "both" && (
            <div>
              <label className={modalStyles.label}>Type</label>
              <div className={modalStyles.typeButtonContainer}>
                <button
                  type="button"
                  className={modalStyles.typeButton(newTransaction.type === "income", modalStyles.colorClasses.teal.typeButtonSelected)}
                  onClick={() => setNewTransaction((p) => ({ ...p, type: "income", category: "Salary" }))}
                >
                  Income
                </button>
                <button
                  type="button"
                  className={modalStyles.typeButton(newTransaction.type === "expense", modalStyles.colorClasses.orange.typeButtonSelected)}
                  onClick={() => setNewTransaction((p) => ({ ...p, type: "expense", category: "Food" }))}
                >
                  Expense
                </button>
              </div>
            </div>
          )}

          <div>
            <label className={modalStyles.label}>Description</label>
            <input
              type="text"
              value={newTransaction.description}
              onChange={(e) => setNewTransaction((p) => ({ ...p, description: e.target.value }))}
              className={modalStyles.input(colorClass.ring)}
              placeholder="Enter description"
            />
          </div>

          <div>
            <label className={modalStyles.label}>Amount</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction((p) => ({ ...p, amount: e.target.value }))}
              className={modalStyles.input(colorClass.ring)}
              placeholder="0.00"
            />
          </div>

          <div>
            <label className={modalStyles.label}>Category</label>
            <select
              value={newTransaction.category}
              onChange={(e) => setNewTransaction((p) => ({ ...p, category: e.target.value }))}
              className={modalStyles.input(colorClass.ring)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={modalStyles.label}>Date</label>
            <input
              type="date"
              value={newTransaction.date}
              min={minDate}
              max={today}
              onChange={(e) => setNewTransaction((p) => ({ ...p, date: e.target.value }))}
              className={modalStyles.input(colorClass.ring)}
            />
          </div>

          <button
            onClick={handleAddTransaction}
            disabled={loading}
            className={modalStyles.submitButton(colorClass.button)}
          >
            {loading ? "Adding..." : buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;

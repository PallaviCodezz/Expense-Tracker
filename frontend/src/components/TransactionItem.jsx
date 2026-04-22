import React, { useState } from "react";
import { Save, X, Edit, Trash2 } from "lucide-react";
import { colorClasses, transactionItemStyles } from "../assets/color.jsx";

const TransactionItem = ({
  transaction,
  isEditing,
  editForm,
  setEditForm,
  onSave,
  onCancel,
  onDelete,
  type = "expense",
  categoryIcons,
  setEditingId,
  amountClass = "font-bold truncate block text-right",
  iconClass = "p-3 rounded-xl flex-shrink-0",
}) => {
  const [errors, setErrors] = useState({ description: "", amount: "" });
  const classes = colorClasses[type];
  const sign = type === "income" ? "+" : "-";

  const validate = () => {
    const nextErrors = { description: "", amount: "" };
    const desc = String(editForm.description ?? "").trim();
    const amt = editForm.amount === "" || editForm.amount == null ? "" : String(editForm.amount).trim();
    if (!desc) nextErrors.description = "Description is required.";
    if (amt === "") nextErrors.amount = "Amount is required.";
    else if (Number(amt) <= 0) nextErrors.amount = "Amount must be greater than 0.";
    setErrors(nextErrors);
    return !nextErrors.description && !nextErrors.amount;
  };

  const handleSaveClick = () => {
    if (validate()) {
      setErrors({ description: "", amount: "" });
      onSave();
    }
  };

  const IconComponent = categoryIcons?.[transaction.category] || null;

  return (
    <div className={`flex flex-col md:flex-row items-stretch justify-between gap-3 p-4 rounded-xl border border-gray-100 mb-3 last:mb-0 ${isEditing ? classes.bg : "hover:bg-gray-50"}`}>
      {/* Left: icon + description */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className={`${iconClass} ${classes.iconBg}`}>
          {IconComponent}
        </div>
        <div className="min-w-0 flex-1">
          {isEditing ? (
            <>
              <input
                type="text"
                value={editForm.description}
                onChange={(e) => setEditForm((prev) => ({ ...prev, description: e.target.value }))}
                className={`w-full bg-white rounded-lg px-3 py-2 focus:outline-none focus:ring-1 border ${errors.description ? "border-red-500 ring-red-500" : `${classes.border} ${classes.ring}`}`}
                placeholder="Description"
              />
              {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
              <div className="flex gap-2 mt-2">
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, category: e.target.value }))}
                  className={`bg-white rounded-lg px-2 py-1 text-sm border focus:outline-none ${classes.border}`}
                >
                  {type === "income"
                    ? ["Salary", "Freelance", "Investment", "Bonus", "Other"].map((c) => <option key={c}>{c}</option>)
                    : ["Food", "Housing", "Transport", "Shopping", "Entertainment", "Utilities", "Healthcare", "Other"].map((c) => <option key={c}>{c}</option>)
                  }
                </select>
                <input
                  type="date"
                  value={editForm.date ? new Date(editForm.date).toISOString().split("T")[0] : ""}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, date: e.target.value }))}
                  className={`bg-white rounded-lg px-2 py-1 text-sm border focus:outline-none ${classes.border}`}
                />
              </div>
            </>
          ) : (
            <>
              <p className="font-medium text-gray-800 truncate">{transaction.description}</p>
              <p className="text-xs text-gray-500 mt-1">{transaction.category} · {new Date(transaction.date).toLocaleDateString()}</p>
            </>
          )}
        </div>
      </div>

      {/* Right: amount + buttons */}
      <div className="flex items-center justify-between gap-3 mt-2 md:mt-0">
        <div className="min-w-[100px] flex-shrink-0 flex flex-col items-end">
          {isEditing ? (
            <>
              <input
                type="number"
                value={editForm.amount}
                onChange={(e) => setEditForm((prev) => ({ ...prev, amount: e.target.value }))}
                className={`w-full max-w-[120px] bg-white rounded-lg px-3 py-2 focus:outline-none focus:ring-1 border ${errors.amount ? "border-red-500 ring-red-500" : `${classes.border} ${classes.ring}`}`}
              />
              {errors.amount && <p className="text-xs text-red-600 mt-1">{errors.amount}</p>}
            </>
          ) : (
            <span className={`${amountClass} ${classes.text}`}>
              {sign}${Number(transaction.amount).toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
            </span>
          )}
        </div>

        <div className="flex gap-1 flex-shrink-0">
          {isEditing ? (
            <>
              <button onClick={handleSaveClick} className={`p-2 ${classes.button} rounded-lg`} title="Save"><Save size={16} /></button>
              <button onClick={() => { setErrors({ description: "", amount: "" }); onCancel(); }} className="p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400" title="Cancel"><X size={16} /></button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setEditForm({
                    description: transaction.description ?? "",
                    amount: transaction.amount ?? "",
                    category: transaction.category ?? "",
                    date: transaction.date ?? "",
                    type: transaction.type ?? type,
                  });
                  setErrors({ description: "", amount: "" });
                  setEditingId(transaction.id);
                }}
                className={`p-2 ${classes.text} rounded-lg hover:${classes.bg}`}
                title="Edit"
              >
                <Edit size={16} />
              </button>
              <button onClick={() => onDelete(transaction.id)} className={`p-2 ${classes.text} rounded-lg hover:${classes.bg}`} title="Delete">
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;

import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "BudgetCategory" },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required:true,
  },
  date: { type: Date, default: Date.now() },
});

const expenseModal = mongoose.model("Expense", ExpenseSchema);

export default expenseModal;

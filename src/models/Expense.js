import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    amountCents: { type: Number, required: true },
    description: String,
  },
  { timestamps: true },
);

export default mongoose.models.Expense ||
  mongoose.model("Expense", ExpenseSchema);

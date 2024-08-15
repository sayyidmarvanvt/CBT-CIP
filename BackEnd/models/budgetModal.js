import mongoose from "mongoose";

const BudgetCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
});


const budgetModal = mongoose.model("BudgetCategory", BudgetCategorySchema);


export default budgetModal;

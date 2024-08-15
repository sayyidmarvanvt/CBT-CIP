import expenseModal from "../models/expenseModal.js";

// Add a new expense
export const addExpense = async (req, res,next) => {
  try {
    const expense = new expenseModal({
      amount: req.body.amount,
      description: req.body.description,
      category: req.body.category,
      eventId: req.body.eventId
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
  next(error)
  }
};

// Get all expenses for an event
export const getExpenses = async (req, res,next) => {
  try {
    const expenses = await expenseModal.find({ eventId: req.params.eventId }).populate('category');
    res.status(200).json(expenses);
  } catch (error) {
    next(error)
  }
};

export const updateExpense= async (req, res, next) => {
  try {
    const expense = await expenseModal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(expense);
  } catch (error) {
    next(error);
  }
}

export const deleteExpense= async (req, res, next) => {
  try {
    await expenseModal.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    next(error);
  }
}
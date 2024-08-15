import express from "express";
import {
  addExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "../controllers/expenseController.js";

const expenseRouter = express.Router();

expenseRouter.post("/", addExpense);
expenseRouter.get("/:eventId", getExpenses);
expenseRouter.put("/:id", updateExpense);
expenseRouter.delete("/:id", deleteExpense);


export default expenseRouter;

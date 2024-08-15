import express from "express";
import {
  createCategory,
  getCategories,
  getACategory,updateCategory,
  deleteCategory
} from "../controllers/budgetController.js";

const budgetRouter = express.Router();

budgetRouter.post("/categories", createCategory);
budgetRouter.get("/:eventId", getCategories);
budgetRouter.get("/categories/:id",getACategory)
budgetRouter.put("/categories/:id", updateCategory)
budgetRouter.delete("/categories/:id",deleteCategory );



export default budgetRouter;

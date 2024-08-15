import express from "express";
import {
  createVendor,
  getVendorsByEvent,
  updateVendor,
  deleteVendor,
  getVendorById,
  addVendorToEvent,
} from "../controllers/vendorController.js";
import { verifyToken } from "../Utility/verifyToken.js";

const vendorRouter = express.Router();

vendorRouter.post("/create", verifyToken, createVendor);
vendorRouter.get("/event/:eventId", verifyToken, getVendorsByEvent);
vendorRouter.get("/:id", verifyToken, getVendorById);
vendorRouter.put("/update/:id", verifyToken, updateVendor);
vendorRouter.delete("/delete/:id", verifyToken, deleteVendor);
vendorRouter.post("/addToEvent", verifyToken,addVendorToEvent);

export default vendorRouter;

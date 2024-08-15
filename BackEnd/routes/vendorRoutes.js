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

vendorRouter.post("/create", createVendor);
vendorRouter.get("/event/:eventId", getVendorsByEvent);
vendorRouter.get("/:id", getVendorById);
vendorRouter.put("/update/:id",  updateVendor);
vendorRouter.delete("/delete/:id",  deleteVendor);
vendorRouter.post("/addToEvent", addVendorToEvent);

export default vendorRouter;

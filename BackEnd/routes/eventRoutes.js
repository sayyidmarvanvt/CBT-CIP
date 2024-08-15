import express from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventWithId,
  updateEvent,
} from "../controllers/eventController.js";

import { verifyToken } from "../Utility/verifyToken.js";

const eventRouter = express.Router();

eventRouter.get("/get", getAllEvents);
eventRouter.post("/create", createEvent);
eventRouter.delete("/delete/:id", verifyToken, deleteEvent);
eventRouter.put("/update/:id", verifyToken, updateEvent);
eventRouter.get("/get/:id", getEventWithId);

export default eventRouter;

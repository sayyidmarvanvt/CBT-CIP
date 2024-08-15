import express from "express";
import {
  createSchedule,
  getSchedule,
  updateSchedule,
  deleteSchedule,
} from "../controllers/scheduleController.js";

const scheduleRouter = express.Router();

scheduleRouter.post("/create", createSchedule);
scheduleRouter.get("/get/:eventId", getSchedule);
scheduleRouter.put("/update/:scheduleId", updateSchedule);
scheduleRouter.delete("/delete/:scheduleId", deleteSchedule);

export default scheduleRouter;

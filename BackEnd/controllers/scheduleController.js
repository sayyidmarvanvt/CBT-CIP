import eventModal from "../models/eventModal.js";
import scheduleModel from "../models/scheduleModal.js";
import { errorHandler } from "../Utility/errorHandler.js";

export const createSchedule = async (req, res, next) => {
  const { eventId, activities } = req.body;

  try {
    const event = await eventModal.findById(eventId);
    if (!event) {
      return next(errorHandler(404, "Event not found"));
    }

    const schedule = new scheduleModel({ eventId, activities });
    await schedule.save();

    res.status(201).json(schedule);
  } catch (error) {
    next(error);
  }
};

export const getSchedule = async (req, res, next) => {
  const { eventId } = req.params;

  try {
    const schedule = await scheduleModel.findOne({ eventId });
    if (!schedule) {
      return next(errorHandler(404, "Schedule not found"));
    }

    res.status(200).json(schedule);
  } catch (error) {
    next(error);
  }
};

export const updateSchedule = async (req, res, next) => {
  const { scheduleId } = req.params;
  const { activities } = req.body;

  try {
    const schedule = await scheduleModel.findByIdAndUpdate(
      scheduleId,
      { activities },
      { new: true }
    );

    if (!schedule) {
      return next(errorHandler(404, "Schedule not found"));
    }

    res.status(200).json(schedule);
  } catch (error) {
    next(error);
  }
};

export const deleteSchedule = async (req, res, next) => {
  const { scheduleId } = req.params;

  try {
    const schedule = await scheduleModel.findByIdAndDelete(scheduleId);
    if (!schedule) {
      return next(errorHandler(404, "Schedule not found"));
    }

    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    next(error);
  }
};

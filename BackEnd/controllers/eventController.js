import eventModal from "../models/eventModal.js";
import { errorHandler } from "../Utility/errorHandler.js";

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await eventModal.find();
    res.status(200).json({ success: true, events });
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (req, res, next) => {
  const { title, date, location, description } = req.body;
  console.log(req.body);
  
  try {
    const newEvent = await eventModal({
      title,
      date,
      location,
      description,
      createdBy: req.user.id,
    });
    const event = await newEvent.save();
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const event = await eventModal.findById(req.params.id);
    if (!event) {
      return next(errorHandler(404, "Event not found"));
    }
    if (event.createdBy.toString() !== req.user.id) {
      return next(
        errorHandler(403, "You don't have permisson to delete this event")
      );
    }
    await eventModal.findByIdAndDelete(event._id)
    res.status(200).json({ success: true, message: "Event removed" });
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  const { title, date, location, description } = req.body;
  try {
    const event = await eventModal.findById(req.params.id);
    if (!event) {
      return next(errorHandler(404, "Event not found"));
    }
    if (event.createdBy.toString() !== req.user.id) {
      return next(
        errorHandler(403, "You do not have permission to update this even")
      );
    }

    const updatedEvent = await eventModal.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title,
          date,
          location,
          description,
        },
      }
    );
 
    res.status(200).json({ success: true, updatedEvent });
  } catch (error) {
    next(error);
  }
};



export const getEventWithId = async (req, res, next) => {
  try {
    const event = await eventModal.findById(req.params.id).populate('guests');
    if (!event) {
      return next(errorHandler(404, "Event not found"));
    }
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};


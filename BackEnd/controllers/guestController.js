import eventModal from "../models/eventModal.js";
import guestModel from "../models/guestModal.js";
import { errorHandler } from "../Utility/errorHandler.js";
import { sendInvitationEmail } from "../Utility/email.js";

export const addGuest = async (req, res, next) => {
  const { name, email, eventId } = req.body;
  try {
    const guest = await guestModel({
      name,
      email,
      event: eventId,
    });
    const newGuest = await guest.save();
    await eventModal.findByIdAndUpdate(eventId, {
      $push: { guests: newGuest._id },
    });
    res.status(200).json({ success: true, guest: newGuest });
  } catch (error) {
    next(error);
  }
};

export const getAllGuest = async (req, res, next) => {
  try {
    const guests = await guestModel.find({ event: req.params.eventId });
    res.status(200).json({ success: true, guests });
  } catch (error) {
    next(error);
  }
};

export const getGuest = async (req, res, next) => {
  try {
    const guests = await guestModel.find({ _id: req.params.id });
    res.status(200).json({ success: true, guests });
  } catch (error) {
    next(error);
  }
};

export const updateGuest = async (req, res, next) => {
  const { name, email, eventId } = req.body;
  try {
    const guest = await guestModel.findById(req.params.id);

    if (!guest) {
      return next(errorHandler(404, "Guest not found"));
    }
    await eventModal.findByIdAndUpdate(
      guest.event,
      { $pull: { guests: guest._id } } // Remove old guest ID
    );
    const updatedGuest = await guestModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name,
          email,
          event: eventId,
        },
      },
    );

    await eventModal.findByIdAndUpdate(updatedGuest.event, {
      $push: { guests: updatedGuest },
    });
    res.status(200).json({ success: true, updatedGuest });
  } catch (error) {
    next(error);
  }
};

export const removeGuest = async (req, res, next) => {
  try {
    const guest = await guestModel.findById(req.params.id);
    if (!guest) {
      return next(errorHandler(404, "Guest not found"));
    }
    await guestModel.findByIdAndDelete(guest._id);
    await eventModal.findByIdAndUpdate(guest.event, {
      $pull: { guests: guest._id },
    });
    res.status(200).json({ success: true, message: "Guest removed" });
  } catch (error) {
    next(error);
  }
};

export const getGuestRSVPStatus = async (req, res, next) => {
  const { guestId } = req.params;

  try {
    const guest = await guestModel.findById(guestId);
    if (!guest) {
      return next(errorHandler(404, "Guest not found"));
    }

    res.status(200).json({ success: true, rsvpStatus: guest.rsvpStatus,name:guest.name });
  } catch (error) {
    next(error);
  }
};

export const updateRSVPStatus = async (req, res, next) => {
  const { guestId } = req.params;
  const { rsvpStatus } = req.body;

  try {
    const guest = await guestModel.findById(guestId);
    if (!guest) {
      return next(errorHandler(404, "Guest not found"));
    }

    if (!['Accepted', 'Declined', 'Pending'].includes(rsvpStatus)) {
      return next(errorHandler(400, "Invalid RSVP status"));
    }

    guest.rsvpStatus = rsvpStatus;
    await guest.save();

    res.status(200).json({ success: true, guest });
  } catch (error) {
    next(error);
  }
};

export const inviteGuest = async (req, res, next) => {
  const { email, eventId } = req.body;
  console.log(req.params.id);
  
  try {
    const event = await eventModal.findById(eventId);
    if (!event) {
      return next(errorHandler(404, "Event not found"));
    }
    await sendInvitationEmail(email, event.title, event.date,req.params.id);
    res.status(200).json({ success: true, message: "Invitation sent" });
  } catch (error) {
    next(error);
  }
};
import eventModal from "../models/eventModal.js";
import vendorModal from "../models/vendorModal.js";
import { errorHandler } from "../Utility/errorHandler.js";

// Create a new Vendor
export const createVendor = async (req, res, next) => {
  const { name, contact, serviceType, eventId } = req.body;
  try {
    // Check if the event exists
    const event = await eventModal.findById(eventId);
    if (!event) {
      return next(errorHandler(404, "Event not found"));
    }

    const newVendor = new vendorModal({
      name,
      contact,
      serviceType,
      eventId,
      status: "Pending", // Default status
    });

    const vendor = await newVendor.save();
    res.status(201).json({ success: true, vendor });
  } catch (error) {
    next(error);
  }
};

// Get all Vendors for an Event
export const getVendorsByEvent = async (req, res, next) => {
  const { eventId } = req.params;
  try {
    const vendors = await vendorModal.find({ eventId });
    if (!vendors.length) {
      return next(errorHandler(404, "No vendors found for this event"));
    }
    res.status(200).json({ success: true, vendors });
  } catch (error) {
    next(error);
  }
};

// Update Vendor Details
export const updateVendor = async (req, res, next) => {
  const { name, contact, serviceType, status } = req.body;
  const { id } = req.params;
  try {
    const vendor = await vendorModal.findById(id);
    if (!vendor) {
      return next(errorHandler(404, "Vendor not found"));
    }

    const updatedVendor = await vendorModal.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          contact,
          serviceType,
          status,
        },
      },
    );
    // vendor.name = name || vendor.name;
    // vendor.contact = contact || vendor.contact;
    // vendor.serviceType = serviceType || vendor.serviceType;
    // vendor.status = status || vendor.status;

    res.status(200).json({ success: true, updatedVendor });
  } catch (error) {
    next(error);
  }
};

// Delete a Vendor
export const deleteVendor = async (req, res, next) => {
  const { id } = req.params;
  try {
    const vendor = await vendorModal.findById(id);
    if (!vendor) {
      return next(errorHandler(404, "Vendor not found"));
    }

    await vendorModal.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Vendor removed" });
  } catch (error) {
    next(error);
  }
};

// Get a single Vendor by ID
export const getVendorById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const vendor = await vendorModal.findById(id);
    if (!vendor) {
      return next(errorHandler(404, "Vendor not found"));
    }
    res.status(200).json({ success: true, vendor });
  } catch (error) {
    next(error);
  }
};

export const addVendorToEvent = async (req, res, next) => {
  try {
    const { vendorId, eventId } = req.body;

    if (!vendorId || !eventId) {
      return res
        .status(400)
        .json({ message: "Vendor ID and Event ID are required." });
    }

    const event = await eventModal.findById(eventId);
    if (!event) {
      return next(errorHandler(404, "Event not Found"));
    }

    const vendor = await vendorModal.findById(vendorId);
    if (!vendor) {
      return next(errorHandler(404, "Vendor not Found"));
    }
    if (event.vendors.includes(vendorId)) {
      return next(
        errorHandler(400, "Vendor is already associated with this event.")
      );
    }
    vendor.eventId = eventId;
    await vendor.save();

    event.vendors.push(vendor._id);
    await event.save();

    const updatedVendors = await vendorModal.find({ eventId });
    console.log("added");

    res.status(200).json({
      message: "Vendor successfully added to the event.",
      vendors: updatedVendors,
    });
  } catch (error) {
    next(error);
  }
};

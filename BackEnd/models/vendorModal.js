import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  name: String,
  contact: String,
  serviceType: String,
  status: { type: String, enum: ["Pending", "Confirmed", "Completed"] },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
});

const vendorModal = mongoose.model("Vendor", vendorSchema);

export default vendorModal;

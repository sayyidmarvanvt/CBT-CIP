import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    guests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Guest" }],
    vendors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vendor" }], 
  },
  { timestamps: true }
);

const eventModel = mongoose.model("Event", eventSchema);

export default eventModel;

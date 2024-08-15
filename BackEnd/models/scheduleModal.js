import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  activities: [
    {
      time: { type: Date, required: true },
      description: { type: String, required: true }
    }
  ]
}, { timestamps: true });

const scheduleModel = mongoose.model("Schedule", scheduleSchema);

export default scheduleModel;

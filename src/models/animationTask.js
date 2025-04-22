import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  client: String,
  project: String,
  subject: String,
  createdBy: String,
  assignedTo: String,
  startDate: String,
  deadline: String,
  time: String,
  status: {
    type: String,
    enum: ["Pending", "Open", "Done"],
    default: "Pending",
  },
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model("animationTask", TaskSchema);

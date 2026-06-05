import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  resume: {
    type: String,
    default: ""
  },

  coverLetter: {
    type: String,
    default: ""
  },

  status: {
    type: String,
    enum: ["applied", "reviewed", "selected", "rejected"],
    default: "applied"
  }

}, { timestamps: true });

const applicationModel = mongoose.model("Application", applicationSchema);

export default applicationModel;
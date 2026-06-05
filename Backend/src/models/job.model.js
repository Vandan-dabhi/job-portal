import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },

  jobTitle: {
    type: String,
    required: true
  },

  description: {
    type: String,
    default: ""
  },

  location: {
    type: String,
    default: ""
  },

  salary: {
    type: Number,
    default: 0
  },

  skillsRequired: {
    type: [String],
    default: []
  },

  jobType: {
  type: String,
  enum: ["Full Time", "Part Time", "Internship"],
  default: "Full Time"
},

workMode: {
  type: String,
  enum: ["Remote", "Onsite", "Hybrid"],
  default: "Onsite"
},

  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, { timestamps: true });

const jobModel = mongoose.model("Job", jobSchema);

export default jobModel;
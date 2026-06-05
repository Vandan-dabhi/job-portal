import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["candidate", "recruiter"],
    required: true,
    default: "candidate"
  },

  skills: {
    type: [String],
    default: []
  },

  resume: {
    type: String,
    default: null
  },

  companyName: {
    type: String,
    default: null
  },

  companyLogo: {
    type: String,
    default: null
  }

}, { timestamps: true });

const userModel = mongoose.model("User",userSchema);

export default userModel;
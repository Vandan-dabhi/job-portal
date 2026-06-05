import applicationModel from "../models/application.model.js";
import userModel from "../models/user.model.js";
import {getImageKit} from "../utils/imagekit.js";
import jobModel from "../models/job.model.js";

//Only Candidate Api's

export const applyJob = async (req, res) => {
  try {
    
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (user.role === "recruiter") {
      return res.status(400).json({
        message: "Recruiters can't apply for jobs"
      });
    }

    const { jobId } = req.params;

    const job = await jobModel.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    const alreadyApplied = await applicationModel.findOne({
      jobId,
      userId
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "You already applied for this job"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Resume is required"
      });
    }

    if (!req.file.mimetype.includes("pdf")) {
    return res.status(400).json({
    message: "Only PDF allowed"
    });
   }

   if (req.file.size > 2 * 1024 * 1024) {
   return res.status(400).json({
    message: "File too large (max 2MB)"
  });
  }

    const imagekit = getImageKit();

   

    const uploadResponse = await imagekit.files.upload({
      file: req.file.buffer.toString("base64"),
      fileName: `${userId}-${Date.now()}-${req.file.originalname}`
    });

    const coverLetter = req.body.coverLetter || "";

    const application = await applicationModel.create({
      jobId,
      userId,
      resume: uploadResponse.url,
      coverLetter
    });

    return res.status(201).json({
      message: "Applied successfully",
      application
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
};

export const getApplications = async (req,res) => {
   try{

    const userId = req.user.id;

    const user = await userModel.findById(userId);

    if(!user){
         return res.status(404).json({
            message:"User not found"
         })
    }

    const applications = await applicationModel.find({
      userId:userId
    }).populate("jobId", "company jobTitle location");

    if(!applications){
        return res.status(404).json({
            message:"Applications not found"
        })
    }

    res.status(200).json({
        message:"applications fetched successfully",
        applications
    })

   }catch(err){
      return res.status(500).json({
      message: err.message
    });
   }
}


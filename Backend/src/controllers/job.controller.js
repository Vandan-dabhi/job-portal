import jobModel from "../models/job.model.js";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import applicationModel from './../models/application.model.js';

//Only Candidate Api's

export const readJob = async (req,res) => {

    try{

      const userId = req.user.id;

      const user = await userModel.findById(userId);

      if(!user){
          return res.status(404).json({
            message:"user not found"
          })
      }

      let jobs;
      let totalJobs = 0;

      const page = Number(req.query.page) || 1;

      const limit = 6;

      const skip = (page - 1) * limit;

      // CANDIDATE
      if(user.role === "candidate"){

         const {search} = req.query;

         const jobsData = await jobModel
         .find({
           jobTitle:{
            $regex: search || "",
            $options:"i"
          }
         })
         .skip(skip)
         .limit(limit)
         .populate("postedBy","companyName");

          totalJobs = await jobModel.countDocuments({
          jobTitle:{
            $regex: search || "",
            $options:"i"
          }
        });

         jobs = await Promise.all(

            jobsData.map(async(job) => {

               const alreadyApplied = await applicationModel.findOne({
                  userId: userId,
                  jobId: job._id
               });

               return {
                  ...job.toObject(),
                  applied: !!alreadyApplied
               }

            })

         )

      }
      
      else {

        return res.status(403).json({
          message: "Invalid user role"
        });

      }

      res.status(200).json({
        message:"jobs fetched successfully",
        jobs,
        currentPage: page,
        totalPages: Math.ceil(totalJobs / limit)
      })

    }catch(err){

      res.status(500).json({
        message: err.message
      });

    }

}

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    if(!user) return res.status(404).json({
      success: false,
      message: "User not found"
    })

    if(user.role !== "candidate") return res.status(403).json({
      success: false,
      message: "Only candidates are allowed."
    })

    const username = user.username

    const totalJobs = await jobModel.countDocuments();

    const appliedCount = await applicationModel.countDocuments({
      userId
    });

    const rejectedCount = await applicationModel.countDocuments({
      userId,
      status: "rejected"
    });

    const selectedCount = await applicationModel.countDocuments({
      userId,
      status: "selected"
    });

    res.status(200).json({
      success: true,
      stats: {
        role:user.role,
        username:username,
        total:totalJobs,
        applied: appliedCount,
        rejected: rejectedCount,
        selected: selectedCount
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const getSingleJob = async (req, res) => {

  try {

    const { id } = req.params;

    const job = await jobModel.findById(id).populate("postedBy","username email");

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.status(200).json({
      job
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};
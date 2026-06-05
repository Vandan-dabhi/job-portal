import userModel from "../models/user.model.js";
import jobModel from "../models/job.model.js";
import applicationModel from "../models/application.model.js";

export const becomeRecruiter = async (req, res) => {
  try{
     
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    if(!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "recruiter") {
      return res.status(400).json({ message: "Already recruiter" });
    }

    const {companyName} = req.body;
      
    if (!companyName) {
      return res
        .status(400)
        .json({ message: "Company name is required to become recruiter" });
    }
    
    user.companyName = companyName;
    user.role = "recruiter";

    await user.save();

    res.status(200).json({ message: "Now you are a recruiter" ,user});
  }catch(err){
      console.log(err);
      res.status(500).json({ message: err.message });
  }
}

export const createJob = async (req,res) => {
  try{
  const userid = req.user.id

  const user = await userModel.findById(userid)

  if(user.role !== "recruiter"){
    return res.status(403).json({
      message:"only recruiters can create jobs"
    })
  }

  const {company,jobTitle,description,location,salary,skillsRequired,jobType,workMode} = req.body

  if (!company || !jobTitle) {
  return res.status(400).json({
    message: "Company and jobTitle are required"
  });
}
  const job = await jobModel.create({
    postedBy:userid,
    company,
    jobTitle,
    description,
    location,
    salary,
    skillsRequired,
    jobType,
    workMode
  })
   
 res.status(201).json({
  message: "Job created successfully",
  job
});

  }catch(err){
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}


export const getRecruiterDashboard = async (req, res) => {

  try {

    const userId = req.user.id;

    const user = await userModel.findById(userId);

    if(!user){
      return res.status(404).json({
        message:"User not found"
      });
    }

    if(user.role !== "recruiter"){
      return res.status(403).json({
        message:"Only recruiters allowed"
      });
    }

    res.status(200).json({
      success:true,
      recruiter:{
        username:user.username,
        companyName:user.companyName,
        role:user.role
      }
    });

  } catch(err){

    res.status(500).json({
      message:err.message
    });

  }

};

export const getRecruiterStats = async (req, res) => {

  try {

    const userId = req.user.id;

    // Find recruiter

    const user = await userModel.findById(userId);

    if(!user){
      return res.status(404).json({
        message:"User not found"
      });
    }

    // Role check

    if(user.role !== "recruiter"){
      return res.status(403).json({
        message:"Only recruiters allowed"
      });
    }

    // Recruiter jobs

    const jobs = await jobModel.find({
      postedBy:userId
    });

    const jobIds = jobs.map(job => job._id);

    // Total applications

    const totalApplications =
      await applicationModel.countDocuments({
        jobId: { $in: jobIds }
      });

    // Selected candidates

    const selectedCandidates =
      await applicationModel.countDocuments({
        jobId: { $in: jobIds },
        status:"selected"
      });

    res.status(200).json({
      success:true,

      stats:{
        totalJobs: jobs.length,
        totalApplications,
        selectedCandidates
      }

    });

  } catch(err){

    res.status(500).json({
      message:err.message
    });

  }

};

export const getRecruiterJobs = async (req, res) => {

  try {

    const userId = req.user.id;

    const user = await userModel.findById(userId);

    if(!user){
      return res.status(404).json({
        message:"User not found"
      });
    }

    if(user.role !== "recruiter"){
      return res.status(403).json({
        message:"Only recruiters allowed"
      });
    }

    const page = Number(req.query.page) || 1;

    const limit = 6;

    const skip = (page - 1) * limit;

    const { search } = req.query;

    const jobs = await jobModel.find({
      postedBy: userId,
      jobTitle: {
        $regex: search || "",
        $options: "i"
      }
    })
    .skip(skip)
    .limit(limit);

    const totalJobs = await jobModel.countDocuments({
      postedBy: userId,
      jobTitle: {
        $regex: search || "",
        $options: "i"
      }
    });

    for(let job of jobs){

    const applicationsCount = await applicationModel.countDocuments({
      jobId: job._id
    });

    job._doc.applicationsCount = applicationsCount;

  }

    res.status(200).json({
      success:true,
      jobs,
      currentPage: page,
      totalPages: Math.ceil(totalJobs / limit)
    });

  } catch(err){

    res.status(500).json({
      message:err.message
    });

  }

};

export const getJobApplications = async (req, res) => {

  try {

    const userId = req.user.id;

    const { jobId } = req.params;

    // Find recruiter

    const user = await userModel.findById(userId);

    if(!user){
      return res.status(404).json({
        success:false,
        message:"User not found"
      });
    }

    // Role check

    if(user.role !== "recruiter"){
      return res.status(403).json({
        success:false,
        message:"Only recruiters can access applications"
      });
    }

    // Find job

    const job = await jobModel.findById(jobId);

    if(!job){
      return res.status(404).json({
        success:false,
        message:"Job not found"
      });
    }

    // Security check

    if(job.postedBy.toString() !== userId){
      return res.status(403).json({
        success:false,
        message:"Unauthorized access"
      });
    }

    // Fetch applications

    const applications = await applicationModel
      .find({ jobId })
      .populate("userId", "username email resume")
      .populate("jobId", "jobTitle company");

    // No applications

    if(applications.length === 0){
      return res.status(200).json({
        success:true,
        message:"No applications yet",
        applications:[]
      });
    }

    // Success response

    res.status(200).json({
      success:true,
      count: applications.length,
      applications
    });

  } catch(err){

    res.status(500).json({
      success:false,
      message: err.message
    });

  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (user.role !== "recruiter") {
      return res.status(403).json({
        message: "Only recruiters can update applications"
      });
    }

    const { applicationId } = req.params;
    const { status } = req.body;

    const allowedStatus = ["applied", "reviewed", "selected", "rejected"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status"
      });
    }

    const application = await applicationModel.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    const job = await jobModel.findById(application.jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    if (job.postedBy.toString() !== userId) {
      return res.status(403).json({
        message: "Not allowed"
      });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      message: "Status updated",
      application
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

export const deleteJob = async (req,res) => {

  try{

    const userId = req.user.id;

    const user = await userModel.findById(userId);

    if(!user){
      return res.status(404).json({
        message:"User not found"
      });
    }

    if(user.role !== "recruiter"){
      return res.status(403).json({
        message:"Only recruiters allowed"
      });
    }

    const { id } = req.params;

    const job = await jobModel.findById(id);

    if(!job){
      return res.status(404).json({
        message:"Job not found"
      });
    }

    if(job.postedBy.toString() !== userId){
      return res.status(403).json({
        message:"Unauthorized"
      });
    }

    await applicationModel.deleteMany({
    jobId: id
  });

    await jobModel.findByIdAndDelete(id);

    res.status(200).json({
      message:"Job deleted successfully"
    });

  }catch(err){

    res.status(500).json({
      message:err.message
    });

  }

}

export const updateJob = async (req, res) => {
  try {

    const userId = req.user.id;

     const user = await userModel.findById(userId);

    if(!user){
      return res.status(404).json({
        message:"User not found"
      });
    }

    if(user.role !== "recruiter"){
      return res.status(403).json({
        message:"Only recruiters allowed"
      });
    }

    const { id } = req.params;

    const job = await jobModel.findById(id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    if (job.postedBy.toString() !== userId) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }
    
    const {
  company,
  jobTitle,
  description,
  location,
  salary,
  skillsRequired,
  jobType,
  workMode
} = req.body;

const updatedJob = await jobModel.findByIdAndUpdate(
  id,
  {
    company,
    jobTitle,
    description,
    location,
    salary,
    skillsRequired,
    jobType,
    workMode
  },
  { new: true }
);

    res.status(200).json({
      success: true,
      job: updatedJob
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};
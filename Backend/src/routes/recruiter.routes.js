import express from "express";
import { becomeRecruiter,createJob,getRecruiterDashboard,getJobApplications,updateApplicationStatus,getRecruiterStats,getRecruiterJobs,deleteJob,updateJob } from "../controllers/recruiter.controller.js";
import authMiddleware from './../middleware/authMiddleware.js';

const router = express.Router();

router.post('/become-recruiter',authMiddleware,becomeRecruiter);
router.post('/createjob',authMiddleware,createJob);
router.get('/dashboard', authMiddleware, getRecruiterDashboard);
router.get('/stats', authMiddleware, getRecruiterStats);
router.get('/jobs', authMiddleware, getRecruiterJobs);
router.get('/applications/:jobId', authMiddleware, getJobApplications);
router.patch('/application/status/:applicationId',authMiddleware,updateApplicationStatus);
router.delete("/job/:id", authMiddleware, deleteJob);
router.put("/job/:id", authMiddleware, updateJob);

export default router;
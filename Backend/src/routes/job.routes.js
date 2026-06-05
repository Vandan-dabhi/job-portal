import express from "express";
import {readJob,getDashboardStats,getSingleJob} from "../controllers/job.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/readjob',authMiddleware,readJob);
router.get('/getdashboardstats',authMiddleware, getDashboardStats);
router.get('/getsinglejob/:id', authMiddleware, getSingleJob);

export default router;


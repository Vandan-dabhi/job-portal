import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {getImageKit} from "../utils/imagekit.js";
import { applyJob,getApplications} from "../controllers/application.controller.js";
import upload from "../middleware/uploadMiddleware.js"

const router = express.Router();

router.post("/apply/:jobId", authMiddleware, upload.single("resume"), applyJob);
router.get("/getapplications",authMiddleware,getApplications);



export default router;

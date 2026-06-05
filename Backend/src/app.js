import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import jobRoutes from "./routes/job.routes.js";
import recruiterRoutes from "./routes/recruiter.routes.js";
import applicationRoutes from "./routes/application.routes.js"
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:  "https://job-portal-seven-neon.vercel.app/",
       credentials: true
}));


app.use("/auth",authRoutes);
app.use("/job",jobRoutes);
app.use("/recruiter", recruiterRoutes);
app.use("/application", applicationRoutes);

export default app
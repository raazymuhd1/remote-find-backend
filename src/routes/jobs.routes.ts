import express from "express"
import asyncHandler from "express-async-handler"
import { createJob, getAllJobs, getJob } from "../controllers/job.controllers"
import { authenticateAccess } from "../middlewares/auth.middlewares"

const router = express.Router()

// POST
router.post("/create", asyncHandler(createJob))

// GET
router.get("/get-all", authenticateAccess, asyncHandler(getAllJobs))
router.get("/get-job/:jobId", authenticateAccess, asyncHandler(getJob))

export default router;
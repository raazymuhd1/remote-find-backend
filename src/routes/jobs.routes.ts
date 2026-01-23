import express from "express"
import asyncHandler from "express-async-handler"
import { createJob, getAllJobs, getJob } from "../controllers/job.controllers"

const router = express.Router()

// POST
router.post("/create-job", asyncHandler(createJob))


// GET
router.get("/get-all-jobs", asyncHandler(getAllJobs))
router.get("/get-job/:jobId", asyncHandler(getJob))
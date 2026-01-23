import express from "express"
import asyncHandler from "express-async-handler"
import { createJob, getAllJobs, getJob } from "../controllers/job.controllers"

const router = express.Router()
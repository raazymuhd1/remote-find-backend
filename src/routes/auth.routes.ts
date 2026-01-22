import express from "express"
import asyncHandler from "express-async-handler"
import { signin, signup } from "../controllers/auth.controllers"

const router = express.Router()

// POST
router.post("/signup", asyncHandler(signup))
router.post("/signin", asyncHandler(signin))
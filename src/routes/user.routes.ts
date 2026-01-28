import express from "express"
import asyncHandler from "express-async-handler"
import { getUser } from "../controllers/user.controllers"

const router = express.Router()

router.get("/get-user/:userId", asyncHandler(getUser))

export default router;
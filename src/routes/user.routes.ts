import express from "express"
import asyncHandler from "express-async-handler"
import { getUser, getAllUsers } from "../controllers/user.controllers"
import { authenticateAccess } from "../middlewares/auth.middlewares"

const router = express.Router()

router.get("/get-user/:userId", authenticateAccess, asyncHandler(getUser))
router.get("/get-all", asyncHandler(getAllUsers))

export default router;
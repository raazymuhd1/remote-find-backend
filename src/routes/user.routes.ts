import express from "express"
import asyncHandler from "express-async-handler"
import { getUser, getAllUsers } from "../controllers/user.controllers"

const router = express.Router()

router.get("/get-user/:userId", asyncHandler(getUser))
router.get("/get-all", asyncHandler(getAllUsers))

export default router;
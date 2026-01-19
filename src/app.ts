import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDb } from "./dbConnect";

dotenv.config()
const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors())

// db connection
connectDb()

app.listen(PORT, () => console.log(`server running on port ${PORT}`))
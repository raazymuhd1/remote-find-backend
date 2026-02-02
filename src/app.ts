import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import responseTime from "response-time"
import helmet from "helmet"
import morgan from "morgan"
// routes
import authRoutes from "./routes/auth.routes"
import jobRoutes from "./routes/jobs.routes"
import userRoutes from "./routes/user.routes"

dotenv.config()
const PORT = process.env.PORT || 8000;
const app = express();

app.use(helmet())
app.use(cors({
    origin: "https://remote-find101.vercel.app/"
}))
// allowing express accepting body
app.use(express.json())
app.use(responseTime())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
// routes
app.use("/api/auth", authRoutes)
app.use("/api/job", jobRoutes)
app.use("/api/user", userRoutes)

app.listen(PORT, () => console.log(`server running on port ${PORT}`))
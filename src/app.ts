import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes"
import responseTime from "response-time"
import helmet from "helmet"
import morgan from "morgan"

dotenv.config()
const PORT = process.env.PORT || 8000;
const app = express();

app.use(helmet())
app.use(cors())
// allowing express accepting body
app.use(express.json())
app.use(responseTime())
app.use(morgan())

app.use("/api/auth", authRoutes)

app.listen(PORT, () => console.log(`server running on port ${PORT}`))
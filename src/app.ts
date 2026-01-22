import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes"

dotenv.config()
const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors())
// allowing express accepting body
app.use(express.json())

app.use("/api/auth", authRoutes)

app.listen(PORT, () => console.log(`server running on port ${PORT}`))
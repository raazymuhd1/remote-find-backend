import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"

const connString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: connString }, { schema: "public" })
const prisma = new PrismaClient({ adapter })

export { prisma }
import mongoose from "mongoose";

export const connectDb = async() => {
    const db_url = process.env.DB_URL;

    try {
        const conn = await mongoose.connect(db_url as string);
        console.log(`db connected`)
    } catch (error) {
        console.log(`db connection failed ${error}`)
    }
}
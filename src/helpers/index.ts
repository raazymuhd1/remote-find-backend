import jwt from "jsonwebtoken"
import { JwtPayload } from "../types"

const generateToken = (payload: JwtPayload): string | null => {

    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET as string)
        return token;
    } catch (error) {
        console.log(`token generation failed`)
        return null;
    }
}


export {
    generateToken
}
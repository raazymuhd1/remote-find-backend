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


const verifyToken = (token: string): boolean => {
    try {
        const isTokenValid =  jwt.verify(token, process.env.JWT_SECRET as string)

        if(!isTokenValid) {
            console.log(`token is not valid`)
            return false;
        }

        return true
    } catch (error) {
        console.log(`no token`)
        return false;
    }
}


export {
    generateToken,
    verifyToken
}
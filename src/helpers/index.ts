import jwt from "jsonwebtoken"
import { JwtPayload } from "../types"

enum Status {
    Valid,
    Invalid
}

type VerifyPayload = {
    status: Status;
    payload: JwtPayload | null
}

const generateToken = (payload: JwtPayload): string | null => {

    try {
        const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "2d" })
        return token;
    } catch (error) {
        console.log(`token generation failed`)
        return null;
    }
}


const verifyToken = (token: string): VerifyPayload => {

    try {
        const payload =  jwt.verify(token, process.env.JWT_SECRET as string)

        if(!payload) {
            console.log(`token is not valid`)
            return {
                status: 1,
                payload: null
            };
        }

        return {
            status: 0,
            payload: payload as JwtPayload
        }
    } catch (error) {
         return {
            status: 1,
            payload: null
        };
    }
}


export {
    generateToken,
    verifyToken
}
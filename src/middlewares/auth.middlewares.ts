import { JwtPayload } from "../types"
import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../helpers"

// extending express type definitions
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload
        }
    }
}

/**
 * @dev authenticating user access
 */ const authenticateAccess = (req: Request, res: Response, next: NextFunction) => {
     const bearer = req.headers.authorization;
     const token = bearer?.split(" ")
     
     console.log(`token`, token)
}


export {
    authenticateAccess
}
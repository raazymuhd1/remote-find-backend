import { JwtPayload } from "../types"
import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../helpers"
import { StatusCodes } from "http-status-codes"

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
     
     if(token && token.length > 0) {
        const userPayload = verifyToken(token[1])

        if(userPayload) {
            req.user = userPayload.payload as JwtPayload
        }
        next()
        return
    }

    console.log(`access denied`)
    res.status(StatusCodes.FORBIDDEN).json({ msg: "access denied" })
    return
     
}


export {
    authenticateAccess
}
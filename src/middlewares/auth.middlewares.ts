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

     try {
         if(token && token.length > 0) {
             const userPayload = verifyToken(token[1])
             console.log(`payload ${userPayload.status}`)
    
            if(userPayload?.status == 0) {
                req.user = userPayload.payload as JwtPayload
                next()
                return;
            }
    
            console.log(`access denied`)
            res.status(StatusCodes.FORBIDDEN).json({ msg: "access denied, invalid token", token: token[1] })
            return
        }
        
        res.status(StatusCodes.FORBIDDEN).json({ msg: "access denied, no token" })
        return
     } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: `something went wrong on the server ${error}` })
        return;
     }

     
}


export {
    authenticateAccess
}
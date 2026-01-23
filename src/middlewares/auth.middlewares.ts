import { JwtPayload } from "../types"
import { NextFunction, Request, Response } from "express"

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
 */
const authenticateAccess = (req: Request, res: Response, next: NextFunction) => {

}
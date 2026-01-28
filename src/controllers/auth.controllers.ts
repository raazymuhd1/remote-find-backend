import { StatusCodes } from "http-status-codes";
import { prisma } from "../lib/prisma"
import passport from "passport"
import GoogleStrategy from "passport-google-oidc"
import { Request, Response } from "express";
import bcrypt from "bcryptjs"
import { generateToken } from "../helpers";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

const signup = async(req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt)

    if(!(username || email || password)) {
        console.log(`missing required fields`)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ data: null, msg: "missing required fields" })
        return;
    }
    
    try {

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })
    
        const token = generateToken({
            userId: user.id,
            username: user.username,
            email: user.email
        })
        console.log(`new user signed up`, user)
        res.status(StatusCodes.OK).json({data: {
            user,
            token
        }, msg: "new user signed up"})
        return;
        
    } catch (error) {
        console.log(`something went wrong ${error}`)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({data: null, msg: error instanceof PrismaClientKnownRequestError ? error?.meta?.driverAdapterError?.cause?.originalMessage : error})
        return;
    }
}


const signin = async(req: Request, res: Response) => {
       const { email, password } = req.body;
       
       if(!(email || password)) {
           console.log(`missing required fields`)
           res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ data: null, msg: "missing required fields" })
            return;
        }
        
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })
        const correctPassword = bcrypt.compareSync(password, user?.password as string);

         if(user?.email != email || !correctPassword) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ data: null, msg: "email or password didn't match" })
            return;
         }

        //  signing a token
        const token = generateToken({
            userId: Number(user?.id),
            username: String(user?.username),
            email: String(user?.email)
         })
 
         res.status(StatusCodes.OK).json({ data: {
            user,
            token
         }, msg: "user authenticated", authenticated: true })
}


export {
    signin,
    signup
}
import { StatusCodes } from "http-status-codes";
import { prisma } from "../lib/prisma"
import { Request, Response } from "express";
import bcrypt from "bcryptjs"
import { generateToken } from "../helpers";

const signup = async(req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt)

    if(!(username || email || password)) {
        console.log(`missing required fields`)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ data: null, msg: "missing required fields" })
        return;
    }
    
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
                email,
                password
            }
         })

         if(!user) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ data: null, msg: "email or password didn't match" })
            return;
         }

        //  signing a token
        const token = generateToken({
            userId: user.id,
            username: user.username,
            email: user.email
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
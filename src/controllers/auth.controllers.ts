import { StatusCodes } from "http-status-codes";
import { prisma } from "../lib/prisma"
import { Request, Response } from "express";
import bcrypt from "bcryptjs"

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
            hashedPassword
        }
    })
}


const signin = async() => {

}


export {
    signin,
    signup
}
import { StatusCodes } from "http-status-codes";
import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

/**
 * @dev getting single user
 */
const getUser = async(req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        if(!userId) {
            console.log("missing userId")
            res.status(StatusCodes.BAD_REQUEST).json({ data: null, msg: "missing userId" })
            return;
        }
    
        const user = await prisma.user.findFirst({
            where: { id: Number(userId)},
            select: {
                id: true,
                username: true,
                email: true,
                picture: true,
                postedjobs: true,
                recentJob: true,
                workAt: true,
                experience: true,
                resident: true
            }
        })
    
        if(!user) {
            console.log("no user found")
            res.status(StatusCodes.NOT_FOUND).json({ data: null, msg: `no user found` })
            return;
        }
    
        res.status(StatusCodes.OK).json({ data: user, msg: `found user with this ID ${user?.id}` })
        return;
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ data: null, msg: "something went wrong on the server" })
        return;
    }
}

/**
 * @dev getting all users
 */
const getAllUsers = async(req: Request, res: Response) => {
    const users = await prisma.user.findMany();

    try {
        if(users?.length == 0) {
            res.json({data: null, msg: "no users found"})
            return;
        }
    
        res.status(StatusCodes.OK).json({ data: users, msg: `users found ${users?.length}` })
        return;
    } catch (error) {
        console.log(`something went wrong ${error}`)
        res.json({data: null, msg: "no users found", errMsg: error})
        return;
    }
}

export {
    getUser,
    getAllUsers
}
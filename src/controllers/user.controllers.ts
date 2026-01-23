import { StatusCodes } from "http-status-codes";
import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

const getUser = async(req: Request, res: Response) => {
    const { userId } = req.params;

    const user = await prisma.user.findFirst({
        where: { id: Number(userId)},
        select: {
            id: true,
            username: true,
            email: true,
            picture: true,
            jobs: true
        }
    })

    if(!user) {
        console.log("no user found")
        res.status(StatusCodes.NOT_FOUND).json({ data: null, msg: `no user found` })
        return;
    }

    res.status(StatusCodes.OK).json({ data: user, msg: `found user with this ID ${user?.id}` })
    return;
}

export {
    getUser
}
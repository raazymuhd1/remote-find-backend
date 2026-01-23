import { prisma } from "../lib/prisma";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const createJob = async(req: Request, res: Response) => {
    const { companyName, companyPicture, role, requirements, responsibilities, description, detail } = req.body;
    const { authorId } = req.query;

    if(!(companyName || companyPicture || role || requirements || responsibilities || description || detail)) {
         console.log(`missing required fields`)
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ data: null, msg: "missing required fields" })
          return;
    }

    const author = await prisma.user.findFirst({
        where: { id: Number(authorId) },
        select: {
            id: true,
            username: true,
            email: true,
            picture: true
        }
    })

    if(!author) {
          console.log(`unrecognized author`)
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ data: null, msg: "unrecognized author" })
          return;
    }

    const job = await prisma.job.create({
        data: {
            companyName,
            companyPicture,
            role,
            requirements,
            responsibilities,
            description,
            createdAt: new Date(),
            detail,
            authorId: Number(authorId),
        }
    })

    console.log(`createdAt`, new Date())
    res.status(StatusCodes.OK).json({ data: { job, author }, msg: "new job created" })
    return;
}

const getAllJobs = async() => {

}

const getJob = async() => {

}


export { 
    createJob,
    getAllJobs,
    getJob
 }
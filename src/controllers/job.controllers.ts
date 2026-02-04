import { prisma } from "../lib/prisma";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { dummyJobs } from "../dummy-jobs";


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
            detail: {
                create: {
                    location: detail?.location,
                    position: detail?.position,
                    type: detail?.type,
                    salaryRange: detail?.salaryRange
                }
            },
            authorId: Number(authorId),
        }
    })

    res.status(StatusCodes.OK).json({ data: { job, author }, msg: "new job created" })
    return;
}


const createJobs = async(req: Request, res: Response) => {
    const jobs = req.body;

    if(!jobs) {
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ data: null, msg: "no jobs were posted" })
          return;
    }

    let postedJobs;
    for(const job of jobs) {
        postedJobs = await prisma.job.create({
            data: {
                   companyName: job?.companyName,
                   companyPicture: job?.companyPicture,
                   role: job?.role,
                   requirements: job?.requirements,
                   responsibilities: job?.responsibilities,
                   description: job?.description,
                    createdAt: new Date(),
                    detail: {
                        create: {
                            location: job?.detail?.location,
                            position: job?.detail?.position,
                            type: job?.detail?.type,
                            salaryRange: job?.detail?.salaryRange
                        }
            },
             authorId: 1,
            }
        })
    }

    res.status(StatusCodes.OK).json({ jobs: postedJobs })
    return;
}

const getAllJobs = async(req: Request, res: Response) => {
    const allJobs = await prisma.job.findMany()

    if(allJobs.length == 0) {
        console.log('no jobs found')
        res.status(StatusCodes.NOT_FOUND).json({ data: null, msg: "no jobs found" })
        return
    } 
    
    res.status(StatusCodes.OK).json({ data: allJobs, msg: `${allJobs.length} jobs found` })
    return;
    
}

const getJob = async(req: Request, res: Response) => {
    const { jobId } = req.params;
    const job = await prisma.job.findFirst({
        where: { id: Number(jobId) }
    })
    
    if(!job) {
        res.status(StatusCodes.NOT_FOUND).json({data: null, msg: "no job found"})
        return
    }

    res.status(StatusCodes.OK).json({ data: job, msg: `found jobId ${jobId}` })
}


export { 
    createJob,
    createJobs,
    getAllJobs,
    getJob
 }
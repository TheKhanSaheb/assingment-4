import type { Request,Response,NextFunction } from "express";
import { success } from "zod";

export const notFound = (req:Request ,res:Response,next:NextFunction)=>
{
    res.status(404).json ({
        success:false,
        message:`Not Founf ${req.originalUrl}`

    })
}
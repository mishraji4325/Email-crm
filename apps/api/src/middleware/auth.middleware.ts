import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    userId?: string;
}


export async function authMiddleware(req:AuthRequest, res:Response, next:NextFunction) {
    try{
        const header = req.headers.authorization;

        if(!header){
            return res.status(401).json({message: "Unauthorized"});
        };

        const token = header.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {userId: string};

        req.userId = decoded.userId;
        // req.user.role =  decoded.role; 
        next();
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export async function adminOnly(req:any, res:Response, next:NextFunction){
        if (req.user?.role !== "ADMIN"){
            return res.status(403).json({
                message:"Forbidden"
            })
        }
        next();
    
}
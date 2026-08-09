import { Request , Response} from "express";
import { prisma } from "../lib/prisma";



export async function trackOpen(req:Request , res: Response){
    try{
        await prisma.email.update({
            where:{
                id:req.params.emailId
            },
            data:{
                opened:true,
            }
        });

        const pixel = Buffer.from(
            "R0lGODlhAQABAPAAAMzMzP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
            "base64"
        );

        res.setHeader(
            "Content-Type",
            "image/gif"
        );

        res.send(pixel);
    }catch(err){
        console.log(err);
        res.status(500).send();
    }
}
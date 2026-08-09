import { Request, Response } from "express";
import { prisma } from "../lib/prisma";


export async function handleReplyWebhook(req:Request, res:Response){
    try{
        const {emailId} = req.body;

        const email = await prisma.email.findUnique({
            where:{
                id:emailId
            }
        });

        if(!email){
            return res.status(400).json({
                message:"not found"
            });
        }

        await prisma.lead.update({
            where:{
                id:email.leadId
            },
            data:{
                status:"replied"
            }
        });

        await prisma.activity.create({
            data:{
                type:"Replied",
                description:"Lead replied to email",
                leadId:email.leadId
            }
        });

        res.json({
            success:true
        });
    }catch(err){
        console.log(err);

        res.status(500).json({
            success:false
        });
    }
};


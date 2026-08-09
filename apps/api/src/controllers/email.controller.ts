import {Request, Response} from 'express';
import { prisma } from '../lib/prisma';

export async function getLeadEmails(req:Request, res:Response){
    try{
        const emails = await prisma.email.findMany({
            where: {
                leadId: req.params.leadId
            },
            orderBy:{
                createdAt:"desc"
            }
        });
        res.json(emails);
    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"Something went wrong"
        });
    };
};

export async function updateEmail(req:Request, res:Response){
    try{
        const email = await prisma.email.update({
            where:{
                id:req.params.id
            },
            data:{
                humanizeOutput :req.body.humanizeContent,
            }
        });
        res.json(email);
    }catch(err){
        console.log(err);
        res.status(500).json({
            error:"Something went wrong"
        });
    }
}
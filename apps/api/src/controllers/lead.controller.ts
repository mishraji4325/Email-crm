import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { prisma } from "../lib/prisma";

export async function createLead(req:AuthRequest, res:Response){
    try{
        const { name, email, company, role } = req.body;
        console.log(req.userId);

        const lead = await prisma.lead.create({
            data:{
                name,
                email,
                company,
                role,
                userId: req.userId
            },
        });

        res.status(201).json(lead);
    }catch(error){
        console.log(error); 
        res.status(500).json({ error: "Failed to create lead" });
    }
};

export async function getLeads(req:AuthRequest, res:Response){
    try{
        const leads = await prisma.lead.findMany({
            where:{
                userId: req.userId,
            },

            orderBy:{
                createdAt:"desc",
            },
        });
        res.json(leads);

    }catch(error){
        console.log(error);
        res.status(500).json({ error: "Failed to fetch leads" });
    }
}

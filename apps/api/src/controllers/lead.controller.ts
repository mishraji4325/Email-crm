import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { prisma } from "../lib/prisma";

export async function createLead(req:AuthRequest, res:Response){
    try{
        const { name, email, emails, company, role } = req.body;
        const leadEmails = emails ?? email;

        if (!req.userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (!name || !leadEmails) {
            return res.status(400).json({ error: "Name and email are required" });
        }

        const lead = await prisma.lead.create({
            data:{
                name,
                emails: leadEmails,
                company,
                role,
                userId: req.userId,
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
};

export async function getLeadsById(req:AuthRequest, res:Response){
    try{
        console.log(req.userId)
        console.log(req.params.id)
        const lead = await prisma.lead.findFirst({
            where:{
                id: req.params.id,
                userId: req.userId,
                
            },
            

            include:{
                notes:true
            }
        });
        res.json(lead);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Failed to fetch lead" });
    }
};

export async function updateLeadStatus(req:AuthRequest, res:Response){
    
}

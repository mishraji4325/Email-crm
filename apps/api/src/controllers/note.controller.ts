import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { prisma } from "../lib/prisma";


export async function createNote(req: AuthRequest, res: Response) {
    try{
        const {content, leadId} = req.body;

        const note = await prisma.note.create({
            data:{
                content,
                leadId,
            }
        });
        res.json(note);
    }catch(err){
        console.log(err)
        res.status(500).json({ error: 'Failed to create note' });
    }
};

export async function deleteNote(req:Request, res:Response){
    try{
        await prisma.note.delete({
            where:{
                id:req.params.id as string,
            },
        });
        res.json({message:"Note Deleted"})
    }catch(err){
        console.log(err)
        res.status(500).json({err:"failed to delete node"})
    }
}
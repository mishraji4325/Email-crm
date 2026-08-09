import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { AuthRequest } from "../middleware/auth.middleware";


export async function createSequence(req: AuthRequest, res: Response) {
    try {
        console.log("Content-Type:", req.headers["content-type"]);
        console.log("Body:", req.body);
        console.log("Raw req.body:", JSON.stringify(req.body));
        const { name } = req.body;
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const sequence =
            await prisma.sequence.create({
                data: {
                    name,
                    userId: req.userId,
                },
            });
        res.status(201).json(sequence);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to create sequence",
        });
    }
}

export async function getSequence(req: Request, res: Response) {
    try {
        const sequence =
            await prisma.sequence.findUnique({
                where: {
                    id: req.params.id
                },
                include: {
                    steps: true,
                    leads:{
                        include:{
                            lead:true,
                        }
                    }
                }
            });

        if (!sequence) {
            return res.status(404).json({
                message: "Sequence not found"
            });
        }
        res.json(sequence);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server Error"
        });
    }
}

export async function getSequences(req: AuthRequest, res: Response) {
    try {
        const sequences = await prisma.sequence.findMany({
            where: {
                userId: req.userId
            },
            include: {
                steps: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        res.json(sequences);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to fetch sequences"
        });
    }
}

export async function createStep(req: Request, res: Response) {
    try {
        const { dayOffset, subject, body } = req.body;
        const step = await prisma.sequenceStep.create({
            data: {
                sequenceId: req.params.id,
                dayOffset: Number(dayOffset),
                subject,
                body,
            },
        });
        res.status(201).json(step);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to create step",
        });
    }
}

export async function updateStep(req: Request, res: Response) {
    try {
        const { dayOffset, subject, body } = req.body;
        const step =
            await prisma.sequenceStep.update({
                where: {
                    id: req.params.stepId
                },
                data: {
                    dayOffset: Number(dayOffset),
                    subject,
                    body
                }
            });
        res.json(step);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to update step"
        });
    }
}

export async function deleteStep(req: Request, res: Response) {
    try {
        const { stepId } = req.params;
        const step = await prisma.sequenceStep.delete({
            where: {
                id: stepId,
            },
        });

        res.status(200).json({
            message: "Step deleted successfully",
            step,
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Failed to delete step",
        });
    }
}

export async function assignLead( req: Request, res: Response ) {
    try {
        const { leadId } = req.body;
        const assigned =
            await prisma.sequenceLead.create({
                data: {
                    sequenceId: req.params.id,
                    leadId,
                },
            });
        res.status(201).json(assigned);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to assign lead",
        });
    }
}

export async function removeLead( req: Request, res: Response ) {
    try {
        await prisma.sequenceLead.delete({
            where: {
                sequenceId_leadId: {
                    sequenceId: req.params.id,
                    leadId: req.params.leadId,
                },
            },
        });
        res.json({
            message: "Lead removed",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to remove lead",
        });
    }
}

export async function getSequenceLeads( req: Request, res: Response ) {
    try {
        const leads =
            await prisma.sequenceLead.findMany({
                where: {
                    sequenceId: req.params.id,
                },
                include: {
                    lead: true,
                },
            });
        res.json(leads);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to fetch leads",
        });
    }
}
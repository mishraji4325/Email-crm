import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { prisma } from "../lib/prisma";
import { createNotification } from "./notification.controller";

export async function createLead(req: AuthRequest, res: Response) {
    try {
        const { name, email, emails, company, role } = req.body;
        const leadEmails = emails ?? email;

        if (!req.userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (!name || !leadEmails) {
            return res.status(400).json({ error: "Name and email are required" });
        }

        const lead = await prisma.lead.create({
            data: {
                name,
                emails: leadEmails,
                company,
                role,
                userId: req.userId,
            },
        });

        await createNotification({
            userId: req.userId,
            title: "New Lead Added",
            message: `${lead.name} was added to your leads.`,
            type: "LEAD_ADDED",
        });

        res.status(201).json(lead);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create lead" });
    }
};

export async function getLeads(req: AuthRequest, res: Response) {
    try {
        if (!req.userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { search, status, campaign } = req.query;

        const leads = await prisma.lead.findMany({
            where: {
                userId: req.userId,
                ...(search
                    ? {
                        OR: [
                            {
                                name: {
                                    contains: String(search),
                                    mode: "insensitive",
                                },
                            },
                            {
                                company: {
                                    contains: String(search),
                                    mode: "insensitive",
                                },
                            },
                            {
                                emails: {
                                    contains: String(search),
                                    mode: "insensitive",
                                },
                            },
                        ],
                    }
                    : {}),

                ...(status
                    ? {
                        status: status as any,
                    }
                    : {}),

                ...(campaign
                    ? {
                        campaigns: {
                            some: {
                                campaignId: String(campaign),
                            },
                        },
                    }
                    : {}),
            },

            include: {
                emailRecords: true,
                campaigns: {
                    include: {
                        campaign: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        res.json(leads);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch leads" });
    }
}

export async function getLeadsById(req: AuthRequest, res: Response) {
    try {
        if (!req.userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const lead = await prisma.lead.findFirst({
            where: {
                id: req.params.id,
                userId: req.userId,
            },

            include: {
                notes: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                emailRecords: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                activities: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                campaigns: {
                    include: {
                        campaign: true,
                    },
                },
            }
        });

        if (!lead) {
            return res.status(404).json({ error: "Lead not found" });
        }

        res.json(lead);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch lead" });
    }
};

export async function updateLeadStatus( req: AuthRequest, res: Response ) {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const { status } = req.body;

        const lead = await prisma.lead.findFirst({
            where: {
                id: req.params.id,
                userId: req.userId,
            },
        });

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found",
            });
        }

        const updatedLead = await prisma.lead.update({
            where: {
                id: lead.id,
            },
            data: {
                status,
            },
        });

        await createNotification({
            userId: req.userId,
            title: "Lead Status Updated",
            message: `${updatedLead.name} moved to ${status}.`,
            type: "LEAD_STATUS_CHANGED",
        });

        return res.json(updatedLead);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to update lead status",
        });
    }
}

export async function getLeadActivities( req: AuthRequest, res: Response ) {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const lead = await prisma.lead.findFirst({
            where: {
                id: req.params.id,
                userId: req.userId,
            },
        });

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found",
            });
        }

        const activities =
            await prisma.activity.findMany({
                where: {
                    leadId: lead.id,
                },

                orderBy: {
                    createdAt: "desc",
                },
            });

        return res.json(activities);

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Failed to fetch activities",
        });
    }
}

export async function bookMeeting( req: AuthRequest, res: Response ) {
    try {
        if (!req.userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const lead = await prisma.lead.findFirst({
            where: {
                id: req.params.id,
                userId: req.userId,
            },
        });

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found",
            });
        }

        const updatedLead =
            await prisma.lead.update({
                where: {
                    id: lead.id,
                },

                data: {
                    status: "BOOKED",
                },
            });

        await prisma.activity.create({
            data: {
                type: "MEETING_BOOKED",
                description: "Meeting booked with lead",
                leadId: lead.id,
            },
        });

        return res.json(updatedLead);

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Server Error",
        });
    }
}
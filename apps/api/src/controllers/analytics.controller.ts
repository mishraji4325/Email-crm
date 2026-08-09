import { Request, Response } from "express";
import { prisma } from "../lib/prisma";


export async function getAnalytics(req: Request, res: Response) {
    try {
        const totalLeads =
            await prisma.lead.count();

        const totalCampaigns =
            await prisma.campaign.count();

        const totalSequences =
            await prisma.sequence.count();

        const leadStatus = await prisma.lead.groupBy({
            by: ["status"],
            _count: {
                status: true,
            },
        });

        const campaignStats = await prisma.campaign.findMany({
            include: {
                campaignLeads: true,
                emailRecords: true,
            },
        });

        const sequenceStats = await prisma.sequence.findMany({
            include: {
                steps: true,
                leads: true,
            },
        });

        const emailsSent =
            await prisma.email.count();

        const emailsOpened =
            await prisma.email.count({
                where: {
                    opened: true,
                },
            });

        const openRate =
            emailsSent === 0
                ? 0
                : Number(
                    (
                        (emailsOpened / emailsSent) *
                        100
                    ).toFixed(1)
                );

        res.json({
            totalLeads,
            totalCampaigns,
            totalSequences,
            emailsSent,
            emailsOpened,
            openRate,
            leadStatus,
            campaignStats,
            sequenceStats,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to fetch analytics",
        });
    }
}

export async function getPipelineAnalytics(req: Request, res: Response) {
    const stats = {
        new: await prisma.lead.count({
            where: { status: "NEW" }
        }),

        contacted: await prisma.lead.count({
            where: { status: "CONTACTED" }
        }),

        replied: await prisma.lead.count({
            where: { status: "REPLIED" }
        }),

        closed: await prisma.lead.count({
            where: { status: "CLOSED" }
        })
    };
    res.json(stats)
}

export async function getFunnelAnalytics(req: Request, res: Response) {
    try {
        const newCount = await prisma.lead.count({
            where: {
                status: "NEW"
            }
        });

        const contacted = await prisma.lead.count({
            where: {
                status: "CONTACTED"
            }
        });

        const replied = await prisma.lead.count({
            where: {
                status: "REPLIED"
            }
        });

        const booked = await prisma.lead.count({
            where: {
                status: "BOOKED"
            }
        });

        const closed = await prisma.lead.count({
            where: {
                status: "CLOSED"
            }
        });

        res.json({
            new: newCount,
            contacted,
            replied,
            booked,
            closed
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server Error"
        });
    }
}
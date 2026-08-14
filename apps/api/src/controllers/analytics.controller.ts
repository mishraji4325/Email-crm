import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { prisma } from "../lib/prisma";

export async function getAnalytics(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const userId = req.userId;

    // =========================
    // BASIC COUNTS
    // =========================

    const totalLeads = await prisma.lead.count({
      where: {
        userId,
      },
    });

    const totalCampaigns = await prisma.campaign.count({
      where: {
        userId,
      },
    });

    const totalSequences = await prisma.sequence.count({
      where: {
        userId,
      },
    });

    // =========================
    // LEAD STATUS
    // =========================

    const leadStatus = await prisma.lead.groupBy({
      by: ["status"],
      where: {
        userId,
      },
      _count: {
        status: true,
      },
    });

    // =========================
    // CAMPAIGNS
    // =========================

    const campaignStats = await prisma.campaign.findMany({
      where: {
        userId,
      },
      include: {
        campaignLeads: true,
        emailRecords: true,
      },
    });

    // =========================
    // SEQUENCES
    // =========================

    const sequenceStats = await prisma.sequence.findMany({
      where: {
        userId,
      },
      include: {
        steps: true,
        leads: true,
      },
    });

    // =========================
    // EMAIL ANALYTICS
    // =========================

    const emailsSent = await prisma.email.count({
      where: {
        lead: {
          userId,
        },
      },
    });

    const emailsOpened = await prisma.email.count({
      where: {
        opened: true,
        lead: {
          userId,
        },
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

    // =========================
    // RECENT ACTIVITIES
    // =========================

    const recentActivities =
      await prisma.activity.findMany({
        where: {
          lead: {
            userId,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
        include: {
          lead: true,
        },
      });

    // =========================
    // RESPONSE
    // =========================

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
      recentActivities,
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
            where: { status: "NEW",
                userId:req.userId,
             }
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
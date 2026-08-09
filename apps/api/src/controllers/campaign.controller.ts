import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

export async function createCampaign(req: AuthRequest, res: Response) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }
    const campaign = await prisma.campaign.create({
      data: {
        name: req.body.name,
        userId: req.userId,
      },
    });
    res.status(201).json(campaign);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to create campaign",
    });
  }
}

export async function getCampaign(req: Request, res: Response) {
  try {
    const campaign = await prisma.campaign.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        campaignLeads: {
          include: {
            lead: true,
          },
        },
        emailRecords: true,
      },
    });

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found",
      });
    }

    res.json(campaign);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch campaign",
    });
  }
}

export async function deleteCampaign(req: Request, res: Response) {
  try {
    const campaign = await prisma.campaign.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        campaignLeads: true,
      },
    });

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found",
      });
    }

    if (campaign.campaignLeads.length > 0) {
      return res.status(400).json({
        message:
          "Remove all leads before deleting this campaign.",
      });
    }

    await prisma.campaign.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      message: "Campaign deleted",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
}

export async function getCampaigns(req: Request, res: Response) {
  try {
    const campaigns = await prisma.campaign.findMany({
      include: {
        emailRecords: true,
        campaignLeads: {
          include: {
            lead: true
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(campaigns);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch campaigns",
    });
  }
}

export async function addLeadsToCampaign(req: Request, res: Response) {
  try {
    const campaignId = req.params.id;

    const { leadIds } = req.body;

    await prisma.campaignLead.createMany({
      data: leadIds.map((leadId: string) => ({
        campaignId,
        leadId,
      })),
      skipDuplicates: true,
    });

    res.json({
      message: "Leads added successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to add leads",
    });
  }
};

export async function getCampaignAnalytics(req: Request, res: Response) {
  try {
    const campaignId = req.params.id;

    const emails = await prisma.email.findMany({
      where: {
        campaignId
      }
    });

    const sent = emails.length;

    const opened = emails.filter(
      email => email.opened
    ).length;

    const leadCount =
      await prisma.campaignLead.count({
        where: {
          campaignId
        }
      });

    const openRate = sent ? (opened / sent) * 100 : 0;

    res.json({
      sent, opened, openRate, leadCount
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "server error"
    })
  }
};

export async function generateCampaignEmails(req: Request, res: Response) {
  res.json({
    message: "Campaign generation queued"
  })
}
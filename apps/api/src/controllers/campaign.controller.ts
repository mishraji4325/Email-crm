import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { AuthRequest } from "../middleware/auth.middleware.js";
import { createNotification } from "./notification.controller.js";

export async function createCampaign( req: AuthRequest, res: Response ) {
  try {
      if (!req.userId) {
          return res.status(401).json({
              message: "Unauthorized",
          });
      }

      const { name } = req.body;

      if (!name?.trim()) {
          return res.status(400).json({
              message: "Campaign name is required",
          });
      }

      const campaign = await prisma.campaign.create({
          data: {
              name: name.trim(),
              userId: req.userId,
          },
      });

      await createNotification({
          userId: req.userId,
          title: "Campaign Created",
          message: `${campaign.name} was created successfully.`,
          type: "CAMPAIGN_CREATED",
      });

      return res.status(201).json(campaign);

  } catch (err) {

      console.error(err);

      return res.status(500).json({
          error: "Failed to create campaign",
      });
  }
}

export async function getCampaign( req: AuthRequest, res: Response ) {
  try {
      if (!req.userId) {
          return res.status(401).json({
              message: "Unauthorized",
          });
      }

      const campaign = await prisma.campaign.findFirst({
          where: {
              id: req.params.id as string,
              userId: req.userId,
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

      return res.json(campaign);

  } catch (err) {

      console.error(err);

      return res.status(500).json({
          message: "Failed to fetch campaign",
      });
  }
}

export async function deleteCampaign( req: AuthRequest, res: Response ) {
  try {
      if (!req.userId) {
          return res.status(401).json({
              message: "Unauthorized",
          });
      }

      const campaign = await prisma.campaign.findFirst({
          where: {
              id: req.params.id as string,
              userId: req.userId,
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
              id: campaign.id,
          },
      });

      return res.json({
          message: "Campaign deleted",
      });

  } catch (err) {

      console.error(err);

      return res.status(500).json({
          message: "Server Error",
      });
  }
}

export async function getCampaigns( req: AuthRequest, res: Response ) {
  try {
      if (!req.userId) {
          return res.status(401).json({
              message: "Unauthorized",
          });
      }

      const campaigns =
          await prisma.campaign.findMany({
              where: {
                  userId: req.userId,
              },

              include: {
                  emailRecords: true,

                  campaignLeads: {
                      include: {
                          lead: true,
                      },
                  },
              },

              orderBy: {
                  createdAt: "desc",
              },
          });

      return res.json(campaigns);

  } catch (err) {
      console.error(err);

      return res.status(500).json({
          error: "Failed to fetch campaigns",
      });
  }
}

export async function addLeadsToCampaign( req: AuthRequest, res: Response ) {
  try {

      if (!req.userId) {
          return res.status(401).json({
              message: "Unauthorized",
          });
      }

      const campaignId = req.params.id;
      const { leadIds } = req.body;

      if (!Array.isArray(leadIds) || leadIds.length === 0) {
          return res.status(400).json({
              message: "leadIds must be a non-empty array",
          });
      }

      const campaign = await prisma.campaign.findFirst({
          where: {
              id: campaignId as string,
              userId: req.userId,
          },
      });

      if (!campaign) {
          return res.status(404).json({
              message: "Campaign not found",
          });
      }

      const leads = await prisma.lead.findMany({
          where: {
              id: {
                  in: leadIds,
              },
              userId: req.userId,
          },

          select: {
              id: true,
          },
      });

      if (leads.length !== leadIds.length) {
          return res.status(403).json({
              message:
                  "One or more leads do not belong to your account.",
          });
      }

      await prisma.campaignLead.createMany({
          data: leadIds.map((leadId: string) => ({
              campaignId: campaignId as string,
              leadId,
          })),

          skipDuplicates: true,
      });

      return res.json({
          message: "Leads added successfully",
      });

  } catch (err) {

      console.error(err);

      return res.status(500).json({
          error: "Failed to add leads",
      });
  }
}

export async function getCampaignAnalytics( req: AuthRequest, res: Response ) {
  try {

      if (!req.userId) {
          return res.status(401).json({
              message: "Unauthorized",
          });
      }

      const campaignId = req.params.id;

      const campaign = await prisma.campaign.findFirst({
          where: {
              id: campaignId as string,
              userId: req.userId,
          },
      });

      if (!campaign) {
          return res.status(404).json({
              message: "Campaign not found",
          });
      }

      const emails = await prisma.email.findMany({
          where: {
              campaignId: campaignId as string,
          },
      });

      const sent = emails.length;

      const opened = emails.filter(
          (email) => email.opened
      ).length;

      const leadCount =
          await prisma.campaignLead.count({
              where: {
                  campaignId: campaignId as string,
              },
          });

      const openRate =
          sent
              ? (opened / sent) * 100
              : 0;

      return res.json({
          sent,
          opened,
          openRate,
          leadCount,
      });

  } catch (err) {

      console.error(err);

      return res.status(500).json({
          message: "Server error",
      });
  }
}

export async function generateCampaignEmails(req: Request, res: Response) {
  res.json({
    message: "Campaign generation queued"
  })
}
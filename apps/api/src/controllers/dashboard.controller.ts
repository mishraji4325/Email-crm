import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";


export async function getDashboard(req:Request, res:Response){
    try{
        //--------------LEADS----------------
        const totalLeads = await prisma.lead.count({
            where:{
                id: req.params.id as string,
                userId: (req as any ).userId
            }
        });
        const totalCampaigns = await prisma.campaign.count();
        const emailsSent = await prisma.email.count({
            where:{
                isDraft: false
            }
        }); 

        const emailsOpened = await prisma.email.count({
            where:{
                opened:true
            }
        });
        const meetingsBooked = await prisma.lead.count({
            where:{
                status: "BOOKED"
            }
        });
        const openRate = emailsSent === 0 ? 0 : Number(((emailsOpened / emailsSent)*100).toFixed(1));


        //--------------Pipeline----------------

        const pipeline = {NEW : await prisma.lead.count({
            where:{
                status: "NEW"
            }
        }),
        CONTACTED :await prisma.lead.count({
            where:{
                status: "CONTACTED"
            }
        }),
        REPLIED: await prisma.lead.count({
            where:{
                status: "REPLIED"
            }
        }),
        BOOKED: await prisma.lead.count({
            where:{
                status: "BOOKED"
            }
        }),
        CLOSED: await prisma.lead.count({
            where:{
                status: "CLOSED"
            }
        }),
    };

    //--------------ACTIVITY----------------

    const recentActivities = await prisma.activity.findMany({
        take: 5,
        orderBy:{
            createdAt: "desc"
        },
        include:{
            lead:true,
        }
    });
    

    //-------------CAMPAIGNS------------

    const recentCampaigns = await prisma.campaign.findMany({
        take: 5, 
        orderBy:{
            createdAt: "desc"
        },
        include:{
            campaignLeads: true,
            emailRecords: true,
        }
    });

    res.json({
        totalLeads,
        totalCampaigns,
        emailsSent,
        emailsOpened,
        openRate,
        meetingsBooked,
        pipeline,
        recentActivities,
        recentCampaigns
    });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ error: "Failed to fetch dashboard data" });
    }
}

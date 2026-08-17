import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { AuthRequest } from "../middleware/auth.middleware.js";


interface CreateNotificationData {
    userId: string;
    title: string;
    message: string;
    type: string;
}

export async function createNotification({
    userId,
    title,
    message,
    type,
}: CreateNotificationData) {

    return await prisma.notification.create({
        data: {
            userId,
            title,
            message,
            type,
        },
    });
}

export async function getNotifications(
    req: AuthRequest,
    res: Response
) {
    try {
        const notifications =
            await prisma.notification.findMany({
                where: {
                    userId: req.userId,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });

        res.json(notifications);

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Failed to fetch notifications",
        });
    }
}


export async function markNotificationRead(
    req: Request,
    res: Response
) {
    try {

        const notification =
            await prisma.notification.updateMany({
                where: {
                    id: req.params.id as string,
                    userId: (req as any).userId,
                },
                data: {
                    read: true,
                },
            });

        res.json({
            message: "Notification marked as read",
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Failed to update notification",
        });
    }
}


export async function markAllNotificationsRead(
    req: Request,
    res: Response
) {
    try {

        await prisma.notification.updateMany({
            where: {
                userId: (req as any).userId,
                read: false,
            },
            data: {
                read: true,
            },
        });

        res.json({
            message: "All notifications marked as read",
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Failed to update notifications",
        });
    }
}
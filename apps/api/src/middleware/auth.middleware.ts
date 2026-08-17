import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    userId?: string;
    role?: "ADMIN" | "MEMBER";
}

export async function authMiddleware(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    try {
        const header = req.headers.authorization;

        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const token = header.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as {
            userId: string;
            role: "ADMIN" | "MEMBER";
        };

        req.userId = decoded.userId;
        req.role = decoded.role;

        next();

    } catch (error) {
        console.error(error);

        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
}

export function adminOnly(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    if (req.role !== "ADMIN") {
        return res.status(403).json({
            message: "Forbidden",
        });
    }

    next();
}
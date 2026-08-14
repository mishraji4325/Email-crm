import { prisma } from '../lib/prisma';
import { Request, Response } from 'express';

export async function createWorkspace(req: Request, res: Response) {
    try {
        const { name } = req.body;
        const workspace = await prisma.workspace.create({
            data: {
                name,
            }
        });
        res.status(201).json(workspace);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "failed to create workspace"
        })
    }
}

export async function getWorkspaces(req: Request, res: Response) {
    try {
        const workspaces = await prisma.workspace.findMany({
            include: {
                users: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        res.status(201).json(workspaces);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "failed to fetch workspaces"
        })
    }
}

export async function getWorkspace(req: Request, res: Response) {
    try {
        const workspace =
            await prisma.workspace.findUnique({
                where: {
                    id: req.params.id,
                },
                include: {
                    users: true,
                },
            });
        if (!workspace) {
            return res.status(404).json({
                message: "Workspace not found",
            });
        }
        res.json(workspace);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server Error",
        });
    }
}



export async function joinWorkspace(req: any, res: Response) {
    await prisma.user.update({
        where: {
            id: req.userId
        },
        data: {
            workspaceId: req.params.id
        }
    });
    res.json({
        message: "joined workspace"
    });
}

export async function inviteMember(req: Request, res: Response) {
    try {
        const { userId } = req.body;
        const user =
            await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    workspaceId: req.params.id,
                },
            });
        res.json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to invite member",
        });
    }
}

export async function removeMember(req: Request, res: Response) {
    try {
        const user =
            await prisma.user.update({
                where: {
                    id: req.params.userId,
                },

                data: {
                    workspaceId: null,
                },
            });
        res.json(user);

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to remove member",
        });
    }
}

export async function getAvailableUsers(req: Request, res: Response) {
    try {
        const users = await prisma.user.findMany({
            where: {
                workspaceId: null,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
            
            orderBy: {
                createdAt: "desc",
            },
        });

        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to fetch users",
        });
    }
}

export async function updateWorkspace(req: Request, res: Response) {
    try {
        const { name } = req.body;
        const workspace =
            await prisma.workspace.update({
                where: {
                    id: req.params.id,
                },
                data: {
                    name,
                },
            });
        res.json(workspace);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to update workspace",
        });
    }
}

export async function deleteWorkspace( req: Request, res: Response ) {
    try {
        await prisma.workspace.delete({
            where: {
                id: req.params.id,
            },
        });
        res.json({
            message: "Workspace deleted",
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to delete workspace",
        });
    }
}
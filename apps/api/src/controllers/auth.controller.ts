import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middleware/auth.middleware";

export async function registerUser(req: Request, res: Response) {
  try {
      const { name, email, password } = req.body;

      const existingUser = await prisma.user.findUnique({
          where: { email },
      });

      if (existingUser) {
          return res.status(400).json({
              message: "User already exists",
          });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
          data: {
              name,
              email,
              password: hashedPassword,
              role: "ADMIN",
          },
      });

      const token = jwt.sign(
          {
              userId: user.id,
              role: user.role,
          },
          process.env.JWT_SECRET as string,
          {
              expiresIn: "7d",
          }
      );

      return res.status(201).json({
          message: "User registered successfully",
          token,
          user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
          },
      });

  } catch (error) {
      console.log(error);

      return res.status(500).json({
          message: "Internal server error",
      });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "Login failed" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateProfile(req: AuthRequest, res: Response) {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as {
      userId: string;
    };

    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        NOT: {
          id: decoded.userId,
        },
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email is already in use",
      });
    }

    const user = await prisma.user.update({
      where: {
        id: decoded.userId,
      },
      data: {
        name,
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return res.json({
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {

    console.log(error);

    if (
      error instanceof jwt.JsonWebTokenError
    ) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function deleteAccount(req: AuthRequest, res: Response) {
  try {

      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return res.status(401).json({
              message: "Unauthorized",
          });
      }

      const token = authHeader.split(" ")[1];

      // const decoded = jwt.verify(
      //     token,
      //     process.env.JWT_SECRET as string
      // ) as {
      //     userId: string;
      // };

      await prisma.user.delete({
          where: {
              id: req.userId,
          },
      });

      return res.json({
          message: "Account deleted successfully",
      });

  } catch (error) {

      console.log(error);

      if (
          error instanceof jwt.JsonWebTokenError
      ) {
          return res.status(401).json({
              message: "Invalid or expired token",
          });
      }

      return res.status(500).json({
          message: "Internal server error",
      });
  }
}
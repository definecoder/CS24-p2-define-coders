import errorWrapper from "../middlewares/errorWrapper";
import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import CustomError from "../services/CustomError";
import { getToken, verifyToken } from "../services/Token";

const prisma = new PrismaClient();

const getUserById = errorWrapper(
  async (req: Request, res: Response) => {
    const userId = ((req as any).user as any).id;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        role: true,
      },
    });

    res.status(200).json(user);
  },
  { statusCode: 500, message: "Couldn't fetch user" }
);

const updateUser = errorWrapper(
  async (req: Request, res: Response) => {
    const userInfo: User = req.body;
    const userId = ((req as any).user as any).id;

    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new CustomError("User not found", 404);
    }

    userInfo.roleName = userExists.roleName; // so that the role doesn't get updated

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: userInfo,
    });

    res.status(200).json(user);
  },
  { statusCode: 500, message: "Couldn't update user" }
);

export { getUserById, updateUser };

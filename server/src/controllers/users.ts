import errorWrapper from "../middlewares/errorWrapper";
import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import CustomError from "../services/CustomError";

const prisma = new PrismaClient();

const getAllUsers = errorWrapper(
  async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
      include: {
        role: true,
        sts: true,
        landfill: true,
      },
    });
    res.status(200).json(users);
  },
  { statusCode: 500, message: "Couldn't fetch users" }
);

const getUserById = errorWrapper(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        role: true,
        sts: true,
        landfill: true,
      },
    });

    res.status(200).json(user);
  },
  { statusCode: 500, message: "Couldn't fetch user" }
);

const updateUser = errorWrapper(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const userInfo: User = req.body;

    if (userInfo.roleName) {
      throw new CustomError("Role name can't be updated by current user", 400);
    }

    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new CustomError("User not found", 404);
    }

    // userInfo.roleName = userExists.roleName; // so that the role doesn't get updated

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

const deleteUser = errorWrapper(
  async (req: Request, res: Response) => {
    const { userId } = req.params;

    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new CustomError("User not found", 404);
    }

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    res.status(200).json({ message: "User deleted successfully" });
  },
  { statusCode: 500, message: "Couldn't delete user" }
);

const updateUsersRole = errorWrapper(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { roleName } = req.body;

    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new CustomError("User not found", 404);
    }

    const role = await prisma.role.findUnique({
      where: {
        name: roleName,
      },
    });

    if (!role) {
      throw new CustomError("Role not found", 404);
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        roleName,
      },
    });

    res.status(200).json(user);
  },
  { statusCode: 500, message: "Couldn't update user's role" }
);

export { getAllUsers, getUserById, updateUser, deleteUser, updateUsersRole };

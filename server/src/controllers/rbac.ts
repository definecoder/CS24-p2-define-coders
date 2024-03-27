import errorWrapper from "../middlewares/errorWrapper";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllRoles = errorWrapper(
  async (req: Request, res: Response) => {
    const roles = await prisma.role.findMany({});

    const roleNames = roles.map((role) => role.name);

    res.json(roleNames);
  },
  { statusCode: 500, message: "Couldn't fetch roles" }
);

const getUsersByRole = errorWrapper(
  async (req: Request, res: Response) => {
    const { roleName } = req.params;
    const users = await prisma.user.findMany({
      where: {
        roleName: roleName,
      },
    });
    res.json(users);
  },
  { statusCode: 500, message: "Couldn't fetch users" }
);

export { getAllRoles, getUsersByRole };

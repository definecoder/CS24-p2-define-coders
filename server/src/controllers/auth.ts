import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateToken } from "../services/Token";
import CustomError from "../services/CustomError";

const prisma = new PrismaClient();

const createUser = errorWrapper(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      hashedPassword,
    },
  });

  const token = generateToken({
    id: user.id,
    role: user.roleName,
  });

  res.status(201).json({ user, token });
});

const login = errorWrapper(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new CustomError("This email do not exists", 404);
  }

  const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
    id: user.id,
    role: user.roleName,
  });

  res.json({ user, token });
});

export { createUser, login };

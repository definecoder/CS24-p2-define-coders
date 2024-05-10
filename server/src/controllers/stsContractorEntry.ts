import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// const addSTSContractorEntry = async (req: Request, res: Response) => {

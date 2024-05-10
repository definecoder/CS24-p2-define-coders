import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const addCollectionPlan = async (req: Request, res: Response) => {
  const payload = req.body;
  const newCollectionPlan = await prisma.collectionPlan.create({
    data: payload,
  });

  res.status(201).json(newCollectionPlan);
};

const getAllCollectionPlans = async (req: Request, res: Response) => {
  const collectionPlans = await prisma.collectionPlan.findMany();
  res.status(200).json(collectionPlans);
};

const getCollectionPlansBySTS = async (req: Request, res: Response) => {
  const stsId = req.params.stsId;
  const collectionPlans = await prisma.collectionPlan.findMany({
    where: {
      stsId: stsId,
    },
  });

  res.json(collectionPlans);
};

export { addCollectionPlan, getAllCollectionPlans, getCollectionPlansBySTS };

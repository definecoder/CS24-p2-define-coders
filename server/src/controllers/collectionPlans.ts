import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";

const prisma = new PrismaClient();

const addCollectionPlan = errorWrapper(
  async (req: Request, res: Response) => {
    const {
      areaId,
      collectionStartTime,
      durationForCollection,
      numberOfLaborers,
      numberOfVans,
      expectedWaste,
      routes,
      employees,
    } = req.body;
    const newCollectionPlan = await prisma.collectionPlan.create({
      data: {
        areaId,
        collectionStartTime,
        durationForCollection,
        numberOfLaborers,
        numberOfVans,
        expectedWaste,
      },
    });

    const assignments: {}[] = routes.map((route: any, index: number) => {
      return {
        routeId: route,
        employeeId: employees[index],
      };
    });

    assignments.forEach(async (assignment: any) => {
      await prisma.user.update({
        where: {
          id: assignment.employeeId,
        },
        data: {
          routeId: assignment.routeId,
          collectionPlanId: newCollectionPlan.id,
        },
      });
    });

    res.status(201).json(newCollectionPlan);
  },
  { statusCode: 400, message: "Couldn't add collection plan" }
);

const getAllCollectionPlans = errorWrapper(
  async (req: Request, res: Response) => {
    const collectionPlans = await prisma.collectionPlan.findMany({
      include: {
        User: {
          include: {
            assignedRoute: true,
          },
        },
      },
    });
    res.status(200).json(collectionPlans);
  }
);

const getCollectionPlansBySTS = errorWrapper(
  async (req: Request, res: Response) => {
    const stsId = req.params.stsId;
    const collectionPlans = await prisma.collectionPlan.findMany({
      where: {
        stsId: stsId,
      },
    });

    res.json(collectionPlans);
  },
  { statusCode: 404, message: "Collection Plans not found" }
);

export { addCollectionPlan, getAllCollectionPlans, getCollectionPlansBySTS };

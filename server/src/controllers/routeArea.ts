import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";

const prisma = new PrismaClient();


const addRoute = errorWrapper(
  async (req: Request, res: Response) => {
    const { name, description, stsId } = req.body;
    const newRoute = await prisma.route.create({
      data: {
        name,
        description,
        stsId,
      },
    });

    res.status(201).json(newRoute);
  },
  { statusCode: 400, message: "Route not created" }
);

const getAllRoutes = errorWrapper(
  async (req: Request, res: Response) => {
    const routes = await prisma.route.findMany();
    res.status(200).json(routes);
  },
  { statusCode: 404, message: "Routes not found" }
);

const getRouteById = errorWrapper(
  async (req: Request, res: Response) => {
    const { routeId } = req.params;
    const route = await prisma.route.findUnique({
      where: {
        id: routeId,
      },
    });

    if (!route) {
      res.status(404).json({ message: "Route not found" });
    }

    res.status(200).json(route);
  },
  { statusCode: 404, message: "Route not found" }
);

const addArea = errorWrapper(
  async (req: Request, res: Response) => {
    const { name, stsId } = req.body;
    const newArea = await prisma.area.create({
      data: {
        name,
        stsId,
      },
    });

    res.status(201).json(newArea);
  },
  { statusCode: 400, message: "Area not created" }
);


const addRouteToArea = errorWrapper(
  async (req: Request, res: Response) => {
    const { areaId, routeId } = req.params;

    const area = await prisma.area.findUnique({
      where: {
        id: areaId,
      },
    });

    if (!area) {
      res.status(404).json({ message: "Area not found" });
    }

    const route = await prisma.route.findUnique({
      where: {
        id: routeId,
      },
    });

    if (!route) {
      res.status(404).json({ message: "Route not found" });
    }

    const updatedArea = await prisma.area.update({
      where: {
        id: areaId,
      },
      data: {
        routes: {
          connect: {
            id: routeId,
          },
        },
      },
    });

    res.status(200).json(updatedArea);
  },
  { statusCode: 404, message: "Route or Area not found" }
);

const getAllAreas = errorWrapper(
  async (req: Request, res: Response) => {
    const areas = await prisma.area.findMany();
    res.status(200).json(areas);
  },
  { statusCode: 404, message: "Areas not found" }
);

export {
  addRoute,
  getAllRoutes,
  getRouteById,
  addArea,
  addRouteToArea,
  getAllAreas,
};

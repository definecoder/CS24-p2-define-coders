import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const addRoute = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const newRoute = await prisma.route.create({
    data: {
      name,
      description,
    },
  });

  res.status(201).json(newRoute);
};

const getAllRoutes = async (req: Request, res: Response) => {
  const routes = await prisma.route.findMany();
  res.status(200).json(routes);
};

const getRouteById = async (req: Request, res: Response) => {
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
};

const addArea = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const newArea = await prisma.area.create({
    data: {
      name,
    },
  });

  res.status(201).json(newArea);
};

const addRouteToArea = async (req: Request, res: Response) => {
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
};

const getAllAreas = async (req: Request, res: Response) => {
  const areas = await prisma.area.findMany();
  res.status(200).json(areas);
};

export {
  addRoute,
  getAllRoutes,
  getRouteById,
  addArea,
  addRouteToArea,
  getAllAreas,
};

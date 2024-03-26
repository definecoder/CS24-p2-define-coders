import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import { addTrip } from "../services/trip";
import { Trip } from "@prisma/client";

const createTrip = errorWrapper(async (req: Request, res: Response) => {
  const vehicleEntryId = req.body.vehicleEntryId;

  //   const tripInfo: Trip = {

  //   };

  //   const trip = await addTrip(tripInfo);

  //   res.status(201).json(trip);
});

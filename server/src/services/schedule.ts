import dotenv from "dotenv";
dotenv.config();

import { PrismaClient, Schedule } from "@prisma/client";

import pq from "js-priority-queue";

import { Vehicle } from "../types/vehicle";
import {
  getSortedSTSFromLandfill,
  getSortedVehiclesBySTS,
} from "./optmization";
import CustomError from "./CustomError";

const prisma = new PrismaClient();

const getSchedule = async (stsId: string, today: Date) => {
  const sts = await prisma.sTS.findUnique({
    where: {
      id: stsId,
    },
  });

  if (!sts) {
    throw new CustomError("STS not found", 404);
  }

  let ctw = Number(sts.currentTotalWaste);

  const vehicles: Vehicle[] = await getSortedVehiclesBySTS(stsId);

  const schedules: Schedule[] = [];

  while (ctw > 0 && vehicles.length > 0) {
    let vehicle = vehicles.shift();
    let capacity = Number(vehicle?.capacity);

    const needed = Math.ceil(ctw / capacity);

    const times = Math.min(needed, 3);

    ctw = ctw - times * capacity;

    let time = new Date();
    time.setHours(9, 0, 0);

    for (let i = 0; i < times; i++) {
      const timeString = time.toLocaleTimeString().toString();

      const newSchedule = await prisma.schedule.create({
        data: {
          scheduleDate: new Date(today),
          vehicleId: vehicle?.id || "",
          stsId: stsId,
          wasteAmount: capacity,
          scheduleTime: timeString,
        },
      });

      schedules.push(newSchedule);

      time.setMinutes(time.getMinutes() + 2 * (vehicle?.duration || 0));
    }
  }

  return { schedules, ctw };
};

export { getSchedule };

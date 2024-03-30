import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";

import pq from "js-priority-queue";

import { Vehicle } from "../types/vehicle";
import {
  getSortedSTSFromLandfill,
  getSortedVehiclesBySTS,
} from "../services/optmization";
import CustomError from "../services/CustomError";
import { Schedule } from "../types/schdule";

const prisma = new PrismaClient();

const getSchedule = async (stsId: string) => {
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

  const vehicleNumbers = vehicles.map((vehicle) => vehicle.vehicleNumber);

  console.log(vehicleNumbers);

  const schdules: Schedule[] = [];

  while (ctw > 0 && vehicles.length > 0) {
    let vehicle = vehicles.shift();
    let capacity = Number(vehicle?.capacity);

    const needed = Math.ceil(ctw / capacity);

    const times = Math.min(needed, 3);

    ctw = ctw - times * capacity;
    console.log("ctw:", ctw);
    console.log("duration:", vehicle?.duration);

    console.log("vehicle:", vehicle?.vehicleNumber);

    let time = new Date();
    time.setHours(9, 0);

    for (let i = 0; i < times; i++) {
      const timeString = time.toLocaleTimeString().toString();
      schdules.push({
        vehicleId: vehicle?.id || "",
        vehicleNumber: vehicle?.vehicleNumber || "",
        time: timeString,
      });

      time.setMinutes(time.getMinutes() + 2 * (vehicle?.duration || 0));
    }
  }

  schdules.forEach((schedule) => {
    console.log(`${schedule.vehicleNumber}: ${schedule.time} `);
  });
};

getSchedule("sts1");

import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";

import pq from "js-priority-queue";

import { Vehicle } from "../types/vehicle";
import {
  getSortedSTSFromLandfill,
  getSortedVehiclesBySTS,
} from "../services/optmization";

const prisma = new PrismaClient();

const getSchedule = async () => {
  const stsList = await prisma.sTS.findMany({});

  const vehicles: Vehicle[] = await getSortedVehiclesBySTS(stsList[0].id);

  console.log(vehicles);

  //   const queue = new pq({
  //     comparator: (a: Vehicle, b: Vehicle) => {
  //       if (a.busyTime && b.busyTime) {
  //         return a.busyTime - b.busyTime;
  //       }
  //       return 0; // Return a default value of 0 when a.busyTime or b.busyTime is undefined
  //     },
  //   });
  //   // enter all vehicles in the queue, with the priority being the emergency factor

  //   vehicles.forEach((vehicle: Vehicle) => {
  //     queue.queue(vehicle);
  //   });

  //   for (let i = 0; i < queue.length; i++) {
  //     console.log(queue.dequeue());
  //   }

  //   console.log(stsList);
};

getSchedule();

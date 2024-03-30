import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getSchedule } from "../services/schedule";

import errorWrapper from "../middlewares/errorWrapper";

const prisma = new PrismaClient();

const createSchedule = errorWrapper(
  async (req: Request, res: Response) => {
    const { date } = req.params;

    // check if schedule of this date already exists
    const schedule = await prisma.schedule.findFirst({
      where: {
        scheduleDate: new Date(date),
      },
    });

    if (schedule) {
      return res.json({ message: "Schedule Already Exists" });
    }

    const stsList = await prisma.sTS.findMany();

    for (let sts of stsList) {
      const { ctw } = await getSchedule(sts.id, new Date(date));

      await prisma.sTS.update({
        where: {
          id: sts.id,
        },
        data: {
          currentTotalWaste: ctw >= 0 ? ctw : 0,
        },
      });
    }

    res.json({ message: "Schedule Created" });
  },
  { message: "Schedule Creation Failed", statusCode: 500 }
);

const getScheduleBySTS = errorWrapper(async (req: Request, res: Response) => {
  const stsId = req.params.stsId;
  const schedules = await prisma.schedule.findMany({
    where: {
      stsId: stsId,
    },
  });

  res.json(schedules);
});

const searchSchedule = errorWrapper(async (req: Request, res: Response) => {
  const { stsId, date } = req.query;

  let where: Prisma.ScheduleWhereInput | undefined = undefined;

  if (stsId || date) {
    where = {};
    if (stsId) {
      where.stsId = stsId as string;
    }

    if (date) {
      const dateObject = {
        gte: new Date(date as string),
        lt: new Date(
          new Date(date as string).setDate(
            new Date(date as string).getDate() + 1
          )
        ),
      };
      where.scheduleDate = dateObject;
    }
  }

  const schedules = await prisma.schedule.findMany({
    where,
    include: {
      sts: true,
      vehicle: {
        include: {
          landFill: true,
        },
      },
    },
    orderBy: {
      scheduleTime: "asc",
    },
  });

  res.json(schedules);
});

export { createSchedule, getScheduleBySTS, searchSchedule };

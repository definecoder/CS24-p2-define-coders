import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const adminLog = async (logType: string, description: string) => {
  await prisma.adminLogs.create({
    data: {
      type: logType,
      description: description,
    },
  });
};

export const contractorLog = async (logType: string, description: string) => {
  await prisma.contractorLogs.create({
    data: {
      type: logType,
      description: description,
    },
  });
};

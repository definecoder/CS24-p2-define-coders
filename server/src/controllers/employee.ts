import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { RoleName } from "../types/rolesTypes";

const prisma = new PrismaClient();

const getAllEmployees = async (req: Request, res: Response) => {
  const employees = await prisma.user.findMany({
    where: {
      roleName: RoleName.CONTRACTOR_EMPLOYEE,
    },
  });
  res.status(200).json(employees);
};

const getEmployeeById = async (req: Request, res: Response) => {
  const { employeeId } = req.params;
  const employee = await prisma.user.findUnique({
    where: {
      id: employeeId,
    },
  });

  if (!employee) {
    res.status(404).json({ message: "Employee not found" });
  }

  res.status(200).json(employee);
};

export { getAllEmployees, getEmployeeById };

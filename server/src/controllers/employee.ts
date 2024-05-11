import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { RoleName } from "../types/rolesTypes";
import { contractorLog } from "../services/logdata";
import errorWrapper from "../middlewares/errorWrapper";

const prisma = new PrismaClient();

const getAllEmployees = errorWrapper(
  async (req: Request, res: Response) => {
    const employees = await prisma.user.findMany({
      where: {
        roleName: RoleName.CONTRACTOR_EMPLOYEE,
      },
    });
    res.status(200).json(employees);
  },
  { statusCode: 500, message: "Couldn't fetch employees" }
);

const getEmployeeById = errorWrapper(async (req: Request, res: Response) => {
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
});

const updateEmployee = errorWrapper(
  async (req: Request, res: Response) => {
    const { employeeId } = req.params;
    const employeeInfo = req.body;
    const employee = await prisma.user.update({
      where: {
        id: employeeId,
      },
      data: employeeInfo,
    });

    await contractorLog(
      "Employee Entry",
      `Employee named ${employee.username} updated`
    );

    res.status(200).json(employee);
  },
  { statusCode: 400, message: "Couldn't update employee" }
);

const deleteEmployee = errorWrapper(
  async (req: Request, res: Response) => {
    const { employeeId } = req.params;

    const employee = await prisma.user.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
    }

    await prisma.user.delete({
      where: {
        id: employeeId,
      },
    });

    await contractorLog(
      "Employee Entry",
      `Employee  ${employee?.username} deleted`
    );

    res.status(200).json({ message: "Employee deleted successfully" });
  },
  { statusCode: 400, message: "Couldn't delete employee" }
);

export { getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee };

import { User, PrismaClient, Permission } from "@prisma/client";
import CustomError from "../services/CustomError";

const prisma = new PrismaClient();

const PERMISSIONS = {
  CREATE_USER: "CREATE_USER",
  LOGIN: "LOGIN",
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
  DELETE_USER: "DELETE_USER",
  GET_USERS: "GET_USERS",

  CREATE_BILL: "CREATE_BILL",
  GET_BILLS: "GET_BILLS",
  DELETE_BILL: "DELETE_BILL",

  UPDATING_USER_ROLE: "UPDATING_USER_ROLE",

  CREATE_LANDFILL: "CREATE_LANDFILL",
  DELETE_LANDFILL: "DELETE_LANDFILL",
  UPDATE_LANDFILL: "UPDATE_LANDFILL",

  CREATE_STS: "CREATE_STS",
  DELETE_STS: "DELETE_STS",
  UPDATE_STS: "UPDATE_STS",

  CREATE_STS_VEHICLE_ENTRY: "CREATE_STS_VEHICLE_ENTRY",
  GET_CURRENT_STS_VEHICLE: "GET_CURRENT_STS_VEHICLE",
  GET_LEFT_STS_VEHICLE: "GET_LEFT_STS_VEHICLE",
  DELETE_STS_VEHICLE_ENTRY: "DELETE_STS_VEHICLE_ENTRY",
  UPDATE_STS_VEHICLE_ENTRY: "UPDATE_STS_VEHICLE_ENTRY",

  CREATE_LANDFILL_VEHICLE_ENTRY: "CREATE_LANDFILL_VEHICLE_ENTRY",
  DELETE_LANDFILL_VEHICLE_ENTRY: "DELETE_LANDFILL_VEHICLE_ENTRY",
  UPDATE_LANDFILL_VEHICLE_ENTRY: "UPDATE_LANDFILL_VEHICLE_ENTRY",

  RBAC: "RBAC",

  CREATE_TRIP: "CREATE_TRIP",
  COMPLETE_TRIP: "COMPLETE_TRIP",

  CREATE_VEHICLE: "CREATE_VEHICLE",
  DELETE_VEHICLE: "DELETE_VEHICLE",
  EDIT_VEHICLE: "EDIT_VEHICLE",
};

const getPermittedRoleNames = async (permissionName: string) => {
  const permission = await prisma.permission.findUnique({
    where: {
      name: permissionName,
    },
  });

  if (!permission) {
    throw new CustomError("Permission not found", 404);
  }

  const roles = await prisma.role.findMany({
    where: {
      permissions: {
        some: {
          id: permission.id,
        },
      },
    },
  });

  let roleNames = roles.map((role) => role.name);

  return roleNames;
};

export { PERMISSIONS, getPermittedRoleNames };

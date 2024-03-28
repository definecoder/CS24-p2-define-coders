import { User, PrismaClient, Permission } from "@prisma/client";
import CustomError from "../services/CustomError";

const prisma = new PrismaClient();

const PERMISSIONS = {
  CREATE_USER: "CREATE_USER",
  GET_ALL_USERS: "GET_ALL_USERS",
  DELETE_USER: "DELETE_USER",
  UPDATE_USER_ROLE: "UPDATE_USER_ROLE",
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

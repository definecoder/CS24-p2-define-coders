import { User, PrismaClient, Permission } from "@prisma/client";

const prisma = new PrismaClient();

const PERMISSIONS = {
  CREATE_USER: "CREATE_USER",
  GET_ALL_USERS: "GET_ALL_USERS",
  DELETE_USER: "DELETE_USER",
  UPDATE_USER_ROLE: "UPDATE_USER_ROLE",
};

// const canCreateUser = (user: User) => {
//   const permittedRoles = getPermittedRoles(PERMISSIONS.CREATE_USER);
//   return permittedRoles.includes(user.roleName);
// };

const getPermittedRoles = (permission: string) => {
  const permittedRoles: string[] = [];
  return permittedRoles;
};

export { PERMISSIONS, getPermittedRoles };

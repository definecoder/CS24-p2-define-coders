import errorWrapper from "../middlewares/errorWrapper";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import CustomError from "../services/CustomError";

const prisma = new PrismaClient();

const getAllRoles = errorWrapper(
  async (req: Request, res: Response) => {
    const roles = await prisma.role.findMany({
      include: {
        User: true,        
      },
    });

    // const roleNames = roles.map((role) => role.name);

    res.json(roles);
  },
  { statusCode: 500, message: "Couldn't fetch roles" }
);

const getUsersByRole = errorWrapper(
  async (req: Request, res: Response) => {
    const { roleName } = req.params;
    const users = await prisma.user.findMany({
      where: {
        roleName: roleName,
      },
    });
    res.json(users);
  },
  { statusCode: 500, message: "Couldn't fetch users" }
);

const addRole = errorWrapper(
  async (req: Request, res: Response) => {
    const { roleName } = req.body;
    const role = await prisma.role.create({
      data: {
        name: roleName,
      },
    });
    res.status(201).json(role);
  },
  { statusCode: 500, message: "Couldn't add role" }
);

const deleteRole = errorWrapper(
  async (req: Request, res: Response) => {
    const { roleName } = req.params;
    const role = await prisma.role.delete({
      where: {
        name: roleName,
      },
    });
    res.json(role);
  },
  { statusCode: 500, message: "Couldn't delete role" }
);

const getPermissions = errorWrapper(
  async (req: Request, res: Response) => {
    const permissions = await prisma.permission.findMany({});

    const permissionNames = permissions;

    res.json(permissionNames);
  },
  { statusCode: 500, message: "Couldn't fetch permissions" }
);

const addPermission = errorWrapper(
  async (req: Request, res: Response) => {
    const { permissionName } = req.body;
    const permission = await prisma.permission.create({
      data: {
        name: permissionName,
      },
    });
    res.status(201).json(permission);
  },
  { statusCode: 500, message: "Couldn't add permission" }
);

const addPermissionToRole = errorWrapper(
  async (req: Request, res: Response) => {
    const { roleName, permissionName } = req.params;

    const role = await prisma.role.findUnique({
      where: {
        name: roleName,
      },
    });

    if (!role) {
      throw new CustomError("Role not found", 404);
    }

    const permission = await prisma.permission.findUnique({
      where: {
        name: permissionName,
      },
    });

    if (!permission) {
      throw new CustomError("Permission not found", 404);
    }

    const newRole = await prisma.role.update({
      where: {
        name: roleName,
      },
      data: {
        permissions: {
          connect: {
            id: permission.id,
          },
        },
      },
      include: {
        permissions: true,
      },
    });

    res.json(newRole);
  },
  { statusCode: 500, message: "Couldn't add permission to role" }
);

const removePermissionFromRole = errorWrapper(
  async (req: Request, res: Response) => {
    const { roleName, permissionName } = req.params;
    const role = await prisma.role.findUnique({
      where: {
        name: roleName,
      },
    });

    if (!role) {
      throw new CustomError("Role not found", 404);
    }

    const permission = await prisma.permission.findUnique({
      where: {
        name: permissionName,
      },
    });

    if (!permission) {
      throw new CustomError("Permission not found", 404);
    }

    const rolePermission = await prisma.role.update({
      where: {
        name: roleName,
      },
      data: {
        permissions: {
          disconnect: {
            id: permission.id,
          },
        },
      },
      include: {
        permissions: true,
      },
    });

    res.json(rolePermission);
  },
  { statusCode: 500, message: "Couldn't remove permission from role" }
);

const getAllRolePermissions = errorWrapper(
  async (req: Request, res: Response) => {
    const rolePermissions = await prisma.role.findMany({
      include: {
        permissions: true,
      },
    });

    res.json(rolePermissions);
  },
  { statusCode: 500, message: "Couldn't fetch role permissions" }
);

const getRolesFromPermission = errorWrapper(
  async (req: Request, res: Response) => {
    const { permissionName } = req.params;

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

    res.json(roleNames);
  },
  { statusCode: 500, message: "Couldn't fetch roles" }
);

export {
  getAllRoles,
  getUsersByRole,
  addRole,
  deleteRole,
  getPermissions,
  addPermission,
  addPermissionToRole,
  removePermissionFromRole,
  getRolesFromPermission,
  getAllRolePermissions,
};

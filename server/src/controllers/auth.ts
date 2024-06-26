import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import {
  generateToken,
  getToken,
  invalidateToken,
  verifyToken,
} from "../services/Token";
import CustomError from "../services/CustomError";
import { randomOTPGenerator, randomPasswordGenerator } from "../services/utils";
import { sendMail, sendOTPMail } from "../services/mailService";
import { PERMISSIONS, getPermittedRoleNames } from "../permissions/permissions";

import { adminLog, contractorLog } from "../services/logdata";

import { RoleName } from "../types/rolesTypes";

const prisma = new PrismaClient();

const createUser = errorWrapper(
  async (req: Request, res: Response) => {
    const { username, password, email, roleName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        hashedPassword,
        roleName,
      },
    });

    const token = generateToken(
      {
        id: user.id,
        role: user.roleName,
      },
      "10h"
    );

    sendMail(
      user,
      `Welcome To EcoSync!`,
      `Your account has been created by Admin! Here are the Credentials:`,
      `username: ${username}<br>email: ${email}<br> password: ${password}<br><br>Regards,<br>EcoSync Team`
    );

    res.status(201).json({ user, token });
  },
  { statusCode: 500, message: `Couldn't create user` }
);

const createManager = errorWrapper(
  async (req: Request, res: Response) => {
    const { username, password, email, roleName, contactNumber, contractorId } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        hashedPassword,
        roleName: RoleName.CONTRACTOR_MANAGER,
        contactNumber,
        contractorId,
      },
    });

    const token = generateToken(
      {
        id: user.id,
        role: user.roleName,
      },
      "10h"
    );

    sendMail(
      user,
      `Welcome To EcoSync!`,
      `Your account has been created by Admin! Here are the Credentials:`,
      `username: ${username}<br>email: ${email}<br> password: ${password}<br><br>Regards,<br>EcoSync Team`
    );

    await adminLog(`Manager Entry`, `Manager ${user.username} added`);

    res.status(201).json({ user, token });
  },
  { statusCode: 500, message: `Couldn't create user` }
);

const createEmployee = errorWrapper(
  async (req: Request, res: Response) => {
    const {
      username,
      password,
      email,
      roleName,
      contactNumber,
      contractorId,
      dateOfBirth,
      dateOfHire,
      jobTitle,
      paymentRatePerHour,
      routeId,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        hashedPassword,
        roleName,
        contactNumber,
        dateOfBirth,
        dateOfHire,
        jobTitle,
        paymentRatePerHour,
        routeId,
        contractorId,
      },
    });

    const token = generateToken(
      {
        id: user.id,
        role: user.roleName,
      },
      "10h"
    );

    sendMail(
      user,
      `Welcome To EcoSync!`,
      `Your account has been created by Contractor Manager! Here are the Credentials:`,
      `username: ${username}<br>email: ${email}<br> password: ${password}<br><br>Regards,<br>EcoSync Team`
    );

    await adminLog(`Employee Entry`, `Employee ${user.username} added`);
    await contractorLog(`Employee Entry`, `Employee ${user.username} added`);

    res.status(201).json({ user, token });
  },
  { statusCode: 500, message: `Couldn't create user` }
);

const login = errorWrapper(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        landfill: true,
        sts: true,
        Contractor: true,
      },
    });

    if (!user) {
      throw new CustomError("This email do not exists", 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const roles = await getPermittedRoleNames(PERMISSIONS.LOGIN);

    // console.log(roles);
    // console.log(user.roleName);

    adminLog(
      `Login`,
      `User ${user.username}, Role: ${user.roleName} logged in`
    );

    if (user.roleName === RoleName.CONTRACTOR_EMPLOYEE) {
      contractorLog(
        `Login`,
        `User ${user.username}, Role: ${user.roleName} logged in`
      );
    }

    if (!roles.includes(user.roleName)) {
      throw new CustomError("You are not allowed to login", 403);
    }

    const token = generateToken(
      {
        id: user.id,
        role: user.roleName,
      },
      "1h"
    );

    res.json({ user, token });
  },
  { statusCode: 500, message: `Login Failed` }
);

const logout = errorWrapper(
  async (req: Request, res: Response) => {
    const token = getToken(req) || "no token";
    invalidateToken(token);
    console.log("Logged Out Successfully");

    if (req.user?.roleName === RoleName.CONTRACTOR_EMPLOYEE) {
      await contractorLog(
        `Logout`,
        `User ${req.user.username}, Role: ${req.user.roleName} logged out`
      );
    }

    await adminLog(
      `Logout`,
      `User ${req.user?.username}, Role: ${req.user?.roleName} logged out`
    );

    res.json({ msg: "Logged Out Successfully" });
  },
  { statusCode: 500, message: `Logout Failed` }
);

const updatePassword = errorWrapper(
  async (req: Request, res: Response) => {
    const { oldPassword, newPassword } = req.body;

    const { id } = (req as any).user;

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    const isPasswordValid = await bcrypt.compare(
      oldPassword,
      user.hashedPassword
    );

    if (!isPasswordValid) {
      throw new CustomError("Invalid Old Password", 403);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        hashedPassword,
      },
    });

    res.json({ msg: "Password Updated Successfully" });
  },
  { statusCode: 500, message: `Couldn't update password` }
);

const resetPasswordInit = errorWrapper(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const otp = randomOTPGenerator().toString();

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new CustomError("This email do not exists", 404);
    }

    const otptoken = generateToken({ id: user.id, OTP: otp }, "5m");

    sendOTPMail(user, otp);

    res.json({ otptoken });
  },
  { statusCode: 500, message: `Password reset failed!` }
);

const resetPasswordConfirm = errorWrapper(
  async (req: Request, res: Response) => {
    const { otp } = req.body;

    const token = getToken(req) || "no token";

    const decoded = verifyToken(token);

    if ((decoded as any).OTP == otp) {
      const { id } = decoded as any;

      const newPassword = randomPasswordGenerator();
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const user = await prisma.user.update({
        where: {
          id,
        },
        data: {
          hashedPassword,
        },
      });

      sendMail(
        user,
        `Reset Password Successful`,
        `Your New Password is ${newPassword}`,
        `Please change your password after login`
      );

      res.status(200).json({
        msg: "OTP is correct!, your new password is sent to your email",
      });
    } else {
      throw new CustomError("Wrong OTP", 403);
    }
  },
  {
    statusCode: 500,
    message: `Password reset failed!`,
  }
);

export {
  createUser,
  createManager,
  createEmployee,
  login,
  logout,
  resetPasswordInit,
  resetPasswordConfirm,
  updatePassword,
};

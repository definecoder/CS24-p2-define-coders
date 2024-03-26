import express from "express";
import {
  createUser,
  login,
  logout,
  resetPasswordConfirm,
  resetPasswordInit,
  updatePassword,
} from "../controllers/auth";
import authChecker from "../middlewares/auth";
import { authRole } from "../middlewares/roleGuards";
import { RoleName } from "../types/rolesTypes";

const router = express.Router();

router
  .route("/create")
  .post(authChecker, authRole([RoleName.SYSTEM_ADMIN]), createUser);
router.route("/login").post(login);
router.route("/logout").get(authChecker, logout);
router.route("/reset-password/initiate").post(resetPasswordInit);
router.route("/reset-password/confirm").post(resetPasswordConfirm);
router.route("/change-password").post(authChecker, updatePassword);

export default router;

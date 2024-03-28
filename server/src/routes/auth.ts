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
import { authRole, authorizer } from "../middlewares/authorizer";
import { RoleName } from "../types/rolesTypes";
import { PERMISSIONS } from "../permissions/permissions";

const router = express.Router();

router
  .route("/create")
  .post(authChecker, authorizer(PERMISSIONS.CREATE_USER), createUser);
router.route("/login").post(login);
router.route("/logout").get(authChecker, logout);
router.route("/reset-password/initiate").post(resetPasswordInit);
router.route("/reset-password/confirm").post(resetPasswordConfirm);
router.route("/change-password").post(authChecker, updatePassword);

export default router;

import express from "express";
import authChecker from "../middlewares/auth";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  updateUsersRole,
} from "../controllers/users";
import { getAllRoles } from "../controllers/roles";

const router = express.Router();

// add auth checker to all of these
router.route("/").get(getAllUsers);
router.route("/roles").get(getAllRoles);
router.route("/:userId").get(getUserById);
router.route("/:userId").put(updateUser);
router.route("/:userId").delete(deleteUser);
router.route("/:userId/roles").put(updateUsersRole);

export default router;

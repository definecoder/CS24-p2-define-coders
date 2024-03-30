import express from "express";
import authChecker from "../middlewares/auth";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  updateUsersRole,
} from "../controllers/users";
import { getAllRoles } from "../controllers/rbac";

const router = express.Router();

// add auth checker to all of these
router.route("/").get(getAllUsers);
router.route("/roles").get(getAllRoles);
router.route("/:userId").get(getUserById);
router.route("/:userId").put(updateUser);
router.route("/:userId").delete(deleteUser); // add permission
router.route("/:userId/roles").put(updateUsersRole); // add permission

export default router;

// import express from "express";
// import authChecker from "../middlewares/auth";
// import {
//   deleteUser,
//   getAllUsers,
//   getUserById,
//   updateUser,
//   updateUsersRole,
// } from "../controllers/users";
// import { getAllRoles } from "../controllers/rbac";
// import { authRole } from "../middlewares/roleGuards";
// import { RoleName } from "@prisma/client";

// const router = express.Router();

// // add auth checker to all of these
// router
//   .route("/")
//   .get(authChecker, authRole([RoleName.SYSTEM_ADMIN]), getAllUsers);
// router.route("/roles").get(getAllRoles);
// router.route("/:userId").get(getUserById);
// router.route("/:userId").put(authChecker, updateUser);
// router
//   .route("/:userId")
//   .delete(authChecker, authRole([RoleName.SYSTEM_ADMIN]), deleteUser);
// router
//   .route("/:userId/roles")
//   .put(authChecker, authRole([RoleName.SYSTEM_ADMIN]), updateUsersRole);

// export default router;

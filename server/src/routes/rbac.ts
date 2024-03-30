import express from "express";
import {
  addPermission,
  addPermissionToRole,
  addRole,
  deleteRole,
  getAllRolePermissions,
  getAllRoles,
  getPermissions,
  getRolesFromPermission,
  getUsersByRole,
  removePermissionFromRole,
} from "../controllers/rbac";

const router = express.Router();

// everything for this file will be under rbac Permission only for system admins

router.route("/roles").post(addRole).get(getAllRoles);
router
  .route("/roles/:roleName/permissions/:permissionName")
  .post(addPermissionToRole)
  .delete(removePermissionFromRole);

router.route("/roles/get/:roleName").get(getUsersByRole);
router.route("/roles/delete/:roleName").delete(deleteRole);

router.route("/roles/:permissionName").get(getRolesFromPermission);

router.route("/permissions").get(getPermissions).post(addPermission);
router.route("/all").get(getAllRolePermissions);

export default router;

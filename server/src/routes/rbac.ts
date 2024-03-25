import express from "express";
import { getUsersByRole } from "../controllers/rbac";

const router = express.Router();

router.route("/roles/:roleName").get(getUsersByRole);

export default router;

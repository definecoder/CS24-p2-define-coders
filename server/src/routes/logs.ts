import express from "express";
import { getAdminLogs } from "../controllers/logs";
const router = express.Router();

router.route("/admin").get(getAdminLogs);

export default router;

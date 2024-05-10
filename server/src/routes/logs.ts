import express from "express";
import { getAdminLogs, getContractorManagerLogs } from "../controllers/logs";
const router = express.Router();

router.route("/admin").get(getAdminLogs);
router.route("/contractor").get(getContractorManagerLogs);

export default router;

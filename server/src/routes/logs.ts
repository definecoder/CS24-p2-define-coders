import express from "express";
import { getAdminLogs, getContractorManagerLogs } from "../controllers/logs";
import { adminLog } from "../services/logdata";
const router = express.Router();

router.route("/checkin").post((req, res) => {
  const { flag } = req.body;

  if (flag) {
    adminLog("Checkin", "Shawon Majid has checked in");
  } else {
    adminLog("Checkout", "Shawon Majid has checked out");
  }
});
router.route("/admin").get(getAdminLogs);
router.route("/contractor").get(getContractorManagerLogs);

export default router;

import express from "express";
import { getAdminLogs, getContractorManagerLogs } from "../controllers/logs";
import { adminLog, contractorLog } from "../services/logdata";
const router = express.Router();

router.route("/checkin").post((req, res) => {
  const { flag } = req.body;

  if (flag) {
    adminLog("Checkin", "Shawon Majid has checked in");
    contractorLog("Checkin", "Shawon Majid has checked in");
  } else {
    contractorLog("Checkin", "Shawon Majid has checked in");
    adminLog("Checkout", "Shawon Majid has checked out");
  }

  res.status(200).json({ message: "Checkin status updated" });
});
router.route("/admin").get(getAdminLogs);
router.route("/contractor").get(getContractorManagerLogs);

export default router;

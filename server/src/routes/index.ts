import express from "express";
const router = express.Router();

import authRoute from "./auth";
import userRoute from "./users";
import profileRoute from "./profile";
import rbacRoute from "./rbac";
import vehicleRoute from "./vehicles";
import stsRoute from "./sts";
import landfillRoute from "./landfills";
import landfillEntryRoute from "./landfillVehicle";
import stsEntryRoute from "./stsVehicle";
import billRoute from "./bills";
import tripRoute from "./trip";
import scheduleRoute from "./schedule";
import authChecker from "../middlewares/auth";

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/profile", profileRoute);
router.use("/rbac", rbacRoute); // authentication and authorization both will be added here
router.use("/vehicles", authChecker, vehicleRoute);
router.use("/sts", authChecker, stsRoute);
router.use("/landfills", authChecker, landfillRoute);
router.use("/landfill-entry", authChecker, landfillEntryRoute);
router.use("/sts-entry", authChecker, stsEntryRoute);
router.use("/bills", authChecker, billRoute);
router.use("/trips", authChecker, tripRoute);
router.use("/schedules", scheduleRoute);

export default router;

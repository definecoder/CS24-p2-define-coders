import express from "express";
import { completeTrip, createTrip, getListOfTrips } from "../controllers/trip";
import { authorizer } from "../middlewares/authorizer";
import { PERMISSIONS } from "../permissions/permissions";
const router = express.Router();

router.route("/create").post(authorizer(PERMISSIONS.CREATE_TRIP), createTrip); // add permission
router.route("/search").get(getListOfTrips);
router
  .route("/complete")
  .post(authorizer(PERMISSIONS.COMPLETE_TRIP), completeTrip); // add permission

export default router;

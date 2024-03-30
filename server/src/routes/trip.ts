import express from "express";
import { completeTrip, createTrip, getListOfTrips } from "../controllers/trip";
const router = express.Router();

router.route("/create").post(createTrip); // add permission
router.route("/search").get(getListOfTrips);
router.route("/complete").post(completeTrip); // add permission

export default router;

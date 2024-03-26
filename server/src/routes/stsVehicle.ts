import express from "express";
import {
  addVehicleEntry,
  getAllVehicleEntries,
  getVehicleEntryById,
  updateVehicleEntry,
  deleteVehicleEntry,
  getCurrentVehiclesInSTS,
  getLeftVehiclesInSTS,
} from "../controllers/stsVehicle";
const router = express.Router();

router.route("/create").post(addVehicleEntry);
router.route("/").get(getAllVehicleEntries);
router.route("/:vehicleEntryId").get(getVehicleEntryById);
router.route("/:vehicleEntryId").put(updateVehicleEntry);
router.route("/:vehicleEntryId").delete(deleteVehicleEntry);
router.route("/:stsId/get-current-vehicles").get(getCurrentVehiclesInSTS);
router.route("/:stsId/get-left-vehicles").get(getLeftVehiclesInSTS);

export default router;

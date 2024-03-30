import express from "express";
import {
  addVehicleEntry,
  getAllVehicleEntries,
  getVehicleEntryById,
  updateVehicleEntry,
  deleteVehicleEntry,
  getCurrentVehiclesInSTS,
  getLeftVehiclesInSTS,
  getAvailableVehiclesForSTS,
} from "../controllers/stsVehicle";
const router = express.Router();

router.route("/create").post(addVehicleEntry); // add permission
router.route("/").get(getAllVehicleEntries);
router.route("/:vehicleEntryId").get(getVehicleEntryById);
router.route("/:vehicleEntryId").put(updateVehicleEntry); // add permission
router.route("/:vehicleEntryId").delete(deleteVehicleEntry); // add permission
router.route("/:stsId/get-current-vehicles").get(getCurrentVehiclesInSTS); // add permission
router.route("/:stsId/get-left-vehicles").get(getLeftVehiclesInSTS); // add permission
router.route("/:stsId/get-available-vehicles").get(getAvailableVehiclesForSTS);

export default router;

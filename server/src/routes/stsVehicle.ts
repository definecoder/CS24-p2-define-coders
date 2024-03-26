import express from "express";
import {
  addVehicleEntry,
  getAllVehicleEntries,
  getVehicleEntryById,
  updateVehicleEntry,
  deleteVehicleEntry,
} from "../controllers/stsVehicle";
const router = express.Router();

router.route("/create").post(addVehicleEntry);
router.route("/").get(getAllVehicleEntries);
router.route("/:vehicleEntryId").get(getVehicleEntryById);
router.route("/:vehicleEntryId").put(updateVehicleEntry);
router.route("/:vehicleEntryId").delete(deleteVehicleEntry);

export default router;

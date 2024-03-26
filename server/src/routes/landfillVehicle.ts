import express from "express";
import {
  addVehicleEntry,
  deleteVehicleEntry,
  getAllVehicleEntries,
  getVehicleEntryById,
  updateVehicleEntry,
} from "../controllers/landfillVehicle";
const router = express.Router();

router.route("/create").post(addVehicleEntry);
router.route("/").get(getAllVehicleEntries);
router.route("/:vehicleEntryId").get(getVehicleEntryById);
router.route("/:vehicleEntryId").put(updateVehicleEntry);
router.route("/:vehicleEntryId").delete(deleteVehicleEntry);

export default router;

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
import { authorizer } from "../middlewares/authorizer";
import { PERMISSIONS } from "../permissions/permissions";
const router = express.Router();

router
  .route("/create")
  .post(authorizer(PERMISSIONS.CREATE_STS_VEHICLE_ENTRY), addVehicleEntry); // add permission
router.route("/").get(getAllVehicleEntries);
router.route("/:vehicleEntryId").get(getVehicleEntryById);
router
  .route("/:vehicleEntryId")
  .put(authorizer(PERMISSIONS.UPDATE_STS_VEHICLE_ENTRY), updateVehicleEntry); // add permission
router
  .route("/:vehicleEntryId")
  .delete(authorizer(PERMISSIONS.DELETE_STS_VEHICLE_ENTRY), deleteVehicleEntry); // add permission
router
  .route("/:stsId/get-current-vehicles")
  .get(
    authorizer(PERMISSIONS.GET_CURRENT_STS_VEHICLE),
    getCurrentVehiclesInSTS
  ); // add permission
router
  .route("/:stsId/get-left-vehicles")
  .get(authorizer(PERMISSIONS.GET_LEFT_STS_VEHICLE), getLeftVehiclesInSTS); // add permission
router.route("/:stsId/get-available-vehicles").get(getAvailableVehiclesForSTS);

export default router;

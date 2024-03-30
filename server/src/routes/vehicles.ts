import express from "express";
import {
  createVehicle,
  editVehicle,
  fetchAllVehicles,
  fetchVehicleById,
  getVehiclesOnQuery,
  removeVehicle,
} from "../controllers/vehicle";
import { authorizer } from "../middlewares/authorizer";
import { PERMISSIONS } from "../permissions/permissions";

const router = express.Router();

router
  .route("/create")
  .post(authorizer(PERMISSIONS.CREATE_VEHICLE), createVehicle); // add permission
router.route("/search").get(getVehiclesOnQuery);
router.route("/").get(fetchAllVehicles);
router.route("/:vehicleId").get(fetchVehicleById);
router
  .route("/:vehicleId")
  .put(authorizer(PERMISSIONS.EDIT_VEHICLE), editVehicle); // add permission
router
  .route("/:vehicleId")
  .delete(authorizer(PERMISSIONS.DELETE_VEHICLE), removeVehicle); // add permission

export default router;

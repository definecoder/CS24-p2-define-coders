import express from "express";
const router = express.Router();

import {
  addArea,
  getAllAreas,
  addRoute,
  getAllRoutes,
  getRouteById,
  addRouteToArea,
} from "../controllers/routeArea";

router.route("/create").post(addRoute);
router.route("/").get(getAllRoutes);
router.route("/area").post(addArea);
router.route("/area").get(getAllAreas);
router.route("/:routeId").get(getRouteById);
router.route("/area/:areaId/route/:routeId").post(addRouteToArea);

export default router;

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

router.route("/add-route").post(addRoute);
router.route("/routes").get(getAllRoutes);
router.route("/add-area").post(addArea);
router.route("/area").get(getAllAreas);
router.route("/routes/:routeId").get(getRouteById);
router.route("/area/:areaId/route/:routeId").post(addRouteToArea);

export default router;

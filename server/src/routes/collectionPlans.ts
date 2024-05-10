import express from "express";
const router = express.Router();

import {
  addCollectionPlan,
  getAllCollectionPlans,
  getCollectionPlansBySTS,
} from "../controllers/collectionPlans";

router.route("/create").post(addCollectionPlan);
router.route("/all").get(getAllCollectionPlans);
router.route("/").get(getCollectionPlansBySTS);

export default router;

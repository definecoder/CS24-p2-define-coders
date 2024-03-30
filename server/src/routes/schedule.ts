import express from "express";
const router = express.Router();

import {
  createSchedule,
  getScheduleBySTS,
  searchSchedule,
} from "../controllers/schedule";

router.route("/create/:date").post(createSchedule);
router.route("/search").get(searchSchedule);
router.route("/:stsId").get(getScheduleBySTS);

export default router;

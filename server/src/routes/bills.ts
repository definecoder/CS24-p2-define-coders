import express from "express";
const router = express.Router();

import {
  getBills,
  getBill,
  addBill,
  updateBill,
  deleteBill,
} from "../controllers/bills";

router.route("/").get(getBills);
router.route("/create").post(addBill);
router.route("/:billId").get(getBill);
router.route("/:billId").put(updateBill);
router.route("/:billId").delete(deleteBill);

export default router;

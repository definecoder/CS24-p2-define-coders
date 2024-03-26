import express from "express";
const router = express.Router();

import {
  createBill,
  editBill,
  fetchBill,
  fetchBills,
  removeBill,
} from "../controllers/bills";

router.route("/").get(fetchBills);
router.route("/create").post(createBill);
router.route("/:billId").get(fetchBill);
router.route("/:billId").put(editBill);
router.route("/:billId").delete(removeBill);

export default router;

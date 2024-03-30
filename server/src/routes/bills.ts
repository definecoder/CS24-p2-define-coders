import express from "express";
const router = express.Router();

import {
  createBill,
  createBillFromTrip,
  editBill,
  fetchBill,
  fetchBills,
  getListOfBills,
  removeBill,
} from "../controllers/bills";

router.route("/").get(fetchBills);
router.route("/search").get(getListOfBills); // add permission
router.route("/create").post(createBill);
router.route("/:billId").get(fetchBill);
router.route("/:billId").put(editBill);
router.route("/:billId").delete(removeBill); // add permission
router.route("/create-from-trip/").post(createBillFromTrip); // add permission

export default router;

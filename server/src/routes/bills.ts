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
import { authorizer } from "../middlewares/authorizer";
import { PERMISSIONS } from "../permissions/permissions";
import authChecker from "../middlewares/auth";

router.route("/").get(fetchBills);
router.route("/search").get(authorizer(PERMISSIONS.GET_BILLS), getListOfBills); // add permission
router.route("/create").post(createBill);
router.route("/:billId").get(fetchBill);
router.route("/:billId").put(editBill);
router
  .route("/:billId")
  .delete(authorizer(PERMISSIONS.DELETE_BILL), removeBill); // add permission
router
  .route("/create-from-trip/")
  .post(authorizer(PERMISSIONS.CREATE_BILL), createBillFromTrip); // add permission

export default router;

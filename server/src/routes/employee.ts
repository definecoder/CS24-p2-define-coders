import express from "express";
const router = express.Router();

import {
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee";

router.route("/").get(getAllEmployees);
router
  .route("/:employeeId")
  .get(getEmployeeById)
  .put(updateEmployee)
  .delete(deleteEmployee);

export default router;

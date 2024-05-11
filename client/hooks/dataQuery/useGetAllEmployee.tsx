"use client";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { Contractor, Employee, admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import { message } from "antd";
import axios from "axios";
import { useState, useEffect, use } from "react";

export default function useGetAllEmployees() {
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);

  async function fetchAllEmployees() {
    try {
      const res = await axios.get(apiRoutes.employee.getAll, {
        headers: {
          Authorization: `Bearer ${await getCookie(jwtToken)}`,
        },
      });
      const employeeList = res.data.map((employee: any) => {
        return employee;
      });
      await setEmployeeData(employeeList);
      console.log(employeeList);
    } catch (error: any) {
      message.error(error?.response?.data?.message + "Error fetching employee data... Are you authorized?");      
    }
  }

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  return {fetchAllEmployees, employeeData};
}

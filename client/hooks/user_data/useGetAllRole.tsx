"use client";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import axios from "axios";
import { useState, useEffect, use } from "react";

type User = {
  id: string;
  username: string;
  email: string;
  role: string;
};

export default function useGetAllRole() {
  const [roles, setRoles] = useState<String[]>([]);

  async function fetchAllRoles() {
    try {
      await setRoles([unassigned, admin, landfillManager, stsManager]);
      console.log(roles);
    } catch (error: any) {
      alert("Error fetching roles... Are you authorized?");
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchAllRoles();
  }, []);

  return {fetchAllRoles, roles};
}

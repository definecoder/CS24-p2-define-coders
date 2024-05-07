"use client";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import axios from "axios";
import { useState, useEffect } from "react";
import useGetAllRole from "./useGetAllRole";

export default function useAddNewUser() {
  const [userData, setUserData] = useState({
    email: "",
    roleName: unassigned,
    password: "",
    username: "",
  });

  function isValid(userData: any) {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return (
      userData.email.match(validRegex) &&
      userData.roleName !== "" &&
      userData.password !== "" &&
      userData.username !== ""
    );
  }

  const {roles, fetchAllRoles} = useGetAllRole();  

  useEffect(() => {
    fetchAllRoles();
  }, []);

  async function createNewUser() {
    if (userData && isValid(userData)) {
      try {
        const res = await axios.post(apiRoutes.auth.create, userData, {
          headers: {
            Authorization: `Bearer ${await getCookie(jwtToken)}`,
          },
        });
        return "user created successfully";
      } catch (error: any) {
        return error.message?.toString() || "error creating user";
      }
    }

    return null;
  }

  return { roles, userData, setUserData, createNewUser };
}

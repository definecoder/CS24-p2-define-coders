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

export default function useGetAllUser() {
  const [userData, setUserData] = useState<User[]>([]);

  async function fetchAllUserData() {
    try {
      const res = await axios.get(apiRoutes.user.getAll, {
        headers: {
          Authorization: `Bearer ${await getCookie(jwtToken)}`,
        },
      });
      const userList = res.data.map((user: any) => {
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.roleName,
        };
      });
      await setUserData(userList);
      console.log(userList);
    } catch (error: any) {
      alert("Error fetching user data... Are you authorized?");
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchAllUserData();
  }, []);

  return {fetchAllUserData, userData};
}

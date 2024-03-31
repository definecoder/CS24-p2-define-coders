"use client";
import { UserData } from "@/components/graphs/Data";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import { message } from "antd";
import axios from "axios";
import { useState, useEffect, use } from "react";

type User = {
  id: string;
  username: string;
  email: string;
  role: string;
};

export default async function getUserByRole(roleName: string) {  

    try {
      const res = await axios.get(apiRoutes.rbac.getByRole + roleName, {
        headers: {
          Authorization: `Bearer ${await getCookie(jwtToken)}`,
        },
      });
      const userList = res.data.map((user: any) => {
        return {
          id: user.id,
          username: user.username,
        };
      });      
      console.log(userList);
      return userList;
    } catch (error: any) {
      message.error(error?.response?.data?.message + "Error fetching user data... Are you authorized?");      
    }    

  return [];
}

"use client";
import { User } from "@/components/dataTables/UserList";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import axios from "axios";

export default async function editUser(user: User) {
  if (user) {
    try {
      const res = await axios.put(apiRoutes.user.edit + user.id, {
        username: user.username,
        email: user.email,  
      }, {
        headers: {
          Authorization: `Bearer ${await getCookie(jwtToken)}`,
        },
      });
      const res2 = res.data.roleName !== user.role ? await axios.put(apiRoutes.user.edit + user.id + "/roles", {
        roleName: user.role,
      }, {
        headers: {
          Authorization: `Bearer ${await getCookie(jwtToken)}`,
        },
      }) : null;
      return "user updated successfully";
    } catch (error: any) {
      return error.message?.toString() || "error updating user. You may not have the required permissions.";
    }
  }

  return null;
}

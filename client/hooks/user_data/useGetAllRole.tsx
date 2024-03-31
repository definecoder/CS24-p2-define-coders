"use client";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import { message } from "antd";
import axios from "axios";
import { useState, useEffect, use } from "react";
import { set } from "react-hook-form";

type RolesWithPermisson = {
  id: string;
  name: string;
  permissions: [{
    name: string;
    description: string;
}]
};

export default function useGetAllRole() {
  const [roles, setRoles] = useState<String[]>([]);
  const [rolesWithPermissions, setRolesWithPermissions] = useState<RolesWithPermisson[]>([]);

  async function fetchAllRoles() {
    try {
      const token = getCookie(jwtToken);
      const response = await axios.get(apiRoutes.rbac.getAllRolesWithPermisson, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRolesWithPermissions(response.data.map((role: RolesWithPermisson) => {
        return {
          id: role.id,
          name: role.name,
          permissions: role.permissions.map((permission: any) => {
            return {
              name: permission.name,
              description: permission.description,
            };          
          },
          )};
      }));
      await setRoles([unassigned, admin, landfillManager, stsManager]);      
      // console.log(roles);
    } catch (error: any) {
      message.error(error?.response?.data?.message + "Error fetching roles... Are you authorized?");      
    }
  }

  useEffect(() => {
    
    fetchAllRoles();
  }, []);

  return {fetchAllRoles, roles, rolesWithPermissions};
}

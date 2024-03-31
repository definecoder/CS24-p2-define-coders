"use client";
import { UserData } from "@/components/graphs/Data";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import { message } from "antd";
import axios from "axios";
import { useState, useEffect, use } from "react";


export default async function deleteRole(roleName: string) {  

    if(!roleName) return "Enter a valid role name.";
    try {
      const res = await axios.delete(apiRoutes.rbac.delete + roleName ,{
        headers: {
          Authorization: `Bearer ${await getCookie(jwtToken)}`,
        },
      });

      if(res) return "Role deleted successfully";
    } catch (error: any) {      
      message.error(error?.response?.data?.message + "Error deleting role... Are you authorized?");  
      return null;    
    }
  
}

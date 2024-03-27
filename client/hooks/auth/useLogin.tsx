
import { useState } from 'react';
import {admin, landfillManager, stsManager, unassigned} from '@/data/roles';
import { setCookie } from '@/lib/cookieFunctions';
import axios from 'axios';
import { jwtToken, role , uid , stsId, username, curActive} from '@/data/cookieNames';
import { apiRoutes } from "@/data/apiRoutes";


export default function useLogin() {
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  async function login() {
    if (loginData) {

      try {
        const res = await axios.post(apiRoutes.auth.login, {
          email: loginData.email,
          password: loginData.password,
        });
        res.data.user.roleName.startsWith(admin)
          ? setCookie(role, admin, 1) 
          : res.data.user.roleName.startsWith(landfillManager)
          ? setCookie(role, landfillManager, 1)
          : res.data.user.roleName.startsWith(stsManager)
          ? setCookie(role, stsManager, 1)
          : res.data.user.roleName.startsWith(unassigned)
          ? setCookie(role, unassigned, 1)
          : setCookie(role, res.data.user.roleName, 1);

        setCookie(curActive, res.data.user.roleName === unassigned ? unassigned + "-My Profile" : res.data.user.roleName + "-Dashboard", 1);
        setCookie(jwtToken, res.data.token, 1);
          
        setCookie(stsId, res.data.stsId, 1);
        setCookie(username, res.data.username, 1);

        return true;
      } catch (error: any) {
        alert(error.message?.toString() || "error logging in");
        return false;
      }
    }

    alert("Invalid credentials!");
    return false;
  }

  return { loginData, setloginData, login };
}

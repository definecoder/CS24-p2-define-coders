import { useState } from 'react';
import {admin, landfillManager, stsManager, unassigned} from '@/data/roles';
import { setCookie } from '@/lib/cookieFunctions';
import axios from 'axios';
import { jwtToken, role , uid , stsId, username} from '@/data/cookieNames';

export default function useLogin() {  

  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  async function login() {
    
    if (loginData) {
        // Call the login API
        const res = await axios.post('http://localhost:8585/auth/login', {
            email: loginData.email,
            password: loginData.password          
        })
        res.data.user.roleName.startsWith(admin) ? setCookie(role, admin, 1) : 
        res.data.user.roleName.startsWith(landfillManager) ? setCookie(role, landfillManager, 1) :
        res.data.user.roleName.startsWith(stsManager) ? setCookie(role, stsManager, 1) : 
        res.data.user.roleName.startsWith(unassigned) ? setCookie(role, unassigned, 1) : 
        setCookie(role, res.data.user.roleName , 1);
        setCookie(uid, res.data.user.id ,1 );
        setCookie(jwtToken, res.data.token , 1);
        setCookie(stsId, res.data.stsId, 1);
        setCookie(username, res.data.username, 1);

        console.log(res);
        return true;
    }   
    
    
    alert("Invalid credentials!");
    return false;
  }

  return {loginData, setloginData, login};
}
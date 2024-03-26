import { useState } from 'react';
import {admin, landfillManager, stsManager, unassigned} from '@/data/roles';
import { setCookie } from '@/lib/cookieFunctions';

export default function useLogin() {  

  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  async function login() {
    
    if (loginData) {
        // Call the login API
        loginData.email.startsWith('admin') ? setCookie('role', admin, 1) : 
        loginData.email.startsWith('landfill') ? setCookie('role', landfillManager, 1) :
        loginData.email.startsWith('sts') ? setCookie('role', stsManager, 1) : setCookie('role', unassigned, 1);
        setCookie('jwtToken', 'NOTUN TOKEN', 1);        
        return true;
    }    
    
    alert("Invalid credentials!");
    return false;
  }

  return {loginData, setloginData, login};
}
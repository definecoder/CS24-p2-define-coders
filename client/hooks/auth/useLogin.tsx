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
        setCookie('jwtToken', 'NOTUN TOKEN', 1);
        setCookie('role', admin, 1);
        alert(loginData.email + " " + loginData.password)        
        return true;
    }    
    
    alert("Invalid credentials!");
    return false;
  }

  return {loginData, setloginData, login};
}
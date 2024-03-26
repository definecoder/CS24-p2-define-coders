import { useState } from 'react';
import {admin, landfillManager, stsManager, unassigned} from '@/data/roles';
import { getCookie, setCookie } from '@/lib/cookieFunctions';

export default function useChangePass() {  

  const [passChangeData, setPassChangeData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  async function changePass() {
    
    if (passChangeData) {
        // Call the login API
        const token = getCookie("jwtToken");
        alert("Password Changed Successfully!");
        
        return true;
    }    
    
    alert("Invalid Password!");
    return false;
  }

  return { setPassChangeData, changePass};
}
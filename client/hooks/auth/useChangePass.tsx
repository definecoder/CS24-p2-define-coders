import { useState } from 'react';
import {admin, landfillManager, stsManager, unassigned} from '@/data/roles';
import { getCookie, setCookie } from '@/lib/cookieFunctions';
import { jwtToken } from '@/data/cookieNames';
import axios from 'axios';
import { apiRoutes } from '@/data/apiRoutes';
import { message } from 'antd';

export default function useChangePass() { 
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState(""); 

  const [passChangeData, setPassChangeData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  async function changePass() {
    
    if (passChangeData) {
        // Call the login API
        const token = getCookie(jwtToken);
      console.log(oldPassword);
      console.log(newPassword);
      console.log(getCookie(jwtToken));
        const res = await axios.post(apiRoutes.auth.changePass, {
          oldPassword: oldPassword,
          newPassword: newPassword
        },
          {
            headers: { Authorization: `Bearer ${getCookie(jwtToken)}` },
          }
          );  

            console.log(res.data.msg);
        message.success(res.data.msg);
        
        return true;
    }    
    
    message.error("Invalid Password!");
    return false;
  }

  return { setPassChangeData,setOldPassword, oldPassword, newPassword, setNewPassword, changePass};
}
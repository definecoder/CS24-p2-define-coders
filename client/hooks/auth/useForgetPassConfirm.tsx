import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiRoutes } from '@/data/apiRoutes';
import { jwtToken, otpToken } from '@/data/cookieNames';
import { setCookie, getCookie } from '@/lib/cookieFunctions';
type OTP = string;

export default function useForgetPassConfirm() {

  const [otp, setOtp] = useState<OTP>();

  async function checkOTPandRestPass({email, token}: {email: string, token: string}) {

    console.log(otp);
    
    if (otp) {
        // Call the login API    
        console.log(otp);
        console.log(getCookie(otpToken));  
        const res = await axios.post(apiRoutes.auth.confirmPass, {
          otp: otp,},
          {
            headers: { Authorization: `Bearer ${getCookie(otpToken)}` },
          }
          );  
        alert("Check your email for the reset password link" + res.data.msg);
        return true;
    }    
    
    alert("Invalid OTP!");
    return false;
  }

  return { otp, setOtp, checkOTPandRestPass };
}
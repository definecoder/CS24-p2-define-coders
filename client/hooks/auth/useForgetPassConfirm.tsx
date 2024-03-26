import { useState, useEffect } from 'react';

type OTP = string;

export default function useForgetPassConfirm() {

  const [otp, setOtp] = useState<OTP>();

  async function checkOTPandRestPass({email, token}: {email: string, token: string}) {
    
    if (otp) {
        // Call the login API        
        alert("Check your email for the reset password link" + otp + " " + token);
        return true;
    }    
    
    alert("Invalid OTP!");
    return false;
  }

  return { otp, setOtp, checkOTPandRestPass };
}
"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import useForgetPassConfirm from "@/hooks/auth/useForgetPassConfirm";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { getCookie } from "@/lib/cookieFunctions";
import { jwtToken } from "@/data/cookieNames";

function ForgetPassInitiateForm() {
  const email = useSearchParams().get("email") || "";  
  const [otpValue, setOtpValue] = useState("");

  const { otp, setOtp, checkOTPandRestPass } = useForgetPassConfirm();

  const router = useRouter();

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const sucess = await checkOTPandRestPass({ email, token: getCookie(jwtToken) || ""});    
    sucess && router.push("/auth/login");
  }

  function handleButtonClick() {
    console.log("OTP Value:", otpValue); // Log the OTP value
  }


  return (
    <>
      <form onSubmit={handleFormSubmit} className="grid gap-4">
        <div className="flex flex-col justify-center items-center mb-6 mt-2">
          <Label htmlFor="otp" className="mb-2 text-md">
            Enter OTP
          </Label>
          <InputOTP
            id="otp"
            maxLength={4}
            value={otp}
            onChange={(value) => setOtp(value)} 
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          <div className="mt-4 text-center">OTP has been sent to {email}</div>
        </div>
        <Button type="submit" className={`w-full bg-[#1A4D2E]`} onClick={handleButtonClick}>
          Send Account Credentials in Mail
        </Button>
      </form>
    </>
  );
}
export default ForgetPassInitiateForm;

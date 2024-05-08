"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";
import useForgetPassInitiate from "@/hooks/auth/useForgetPassInitiate";
import { useContext, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { message } from "antd";
import { darkestColor } from "@/data/constant";

function ForgetPassInitiateForm() {
  const { userEmail, setUserEmail, initiate } = useForgetPassInitiate();
  const [isCaptchaVerified, setIsCaptchaVerified] = useState<string | null>();
  const router = useRouter();  

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isCaptchaVerified) {
      message.warning("Please verify that you are not a robot.");
      return;
    }
    const success = await initiate();
    success && router.push("/auth/reset-password/confirm" + "?email=" + userEmail);
  }

  return (
    <>
      <form onSubmit={handleFormSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={userEmail}
            onChange={(e) =>
              setUserEmail(e.target.value)
            }
            required
          />
        </div>
        <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} className="mx-auto" onChange={setIsCaptchaVerified} />
        <Button type="submit" className={`w-full bg-[${darkestColor}]`}>
          Send Reset Password Link
        </Button>
      </form>
    </>
  );
}
export default ForgetPassInitiateForm;

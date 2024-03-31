"use client";
import CaptchaDiv from "@/components/Captcha";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useChangePass from "@/hooks/auth/useChangePass";
import { setCookie } from "@/lib/cookieFunctions";
import { message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function ChangePassword() {
  const router = useRouter();

  const { changePass, setPassChangeData, setOldPassword, setNewPassword, oldPassword, newPassword,} = useChangePass();

  const [isVerified, setIsCaptchaVerified] = useState<string | null>();
  // const [oldPassword, setOldPassword] = useState("");
  // const [newPassword, setNewPassword] = useState("");

  const [time, setTime] = useState(300);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          message.error("Time Expired!");
          router.push("/dashboard");
          return 0;
        } else return time - 0.5;
      });
    }, 1000);
  }, []);

  async function submitForm() {
  
    isVerified && (await changePass()) && router.push("/dashboard");
    !isVerified && message.error("Invalid Captcha!");
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen w-screen">
      <Button variant="outline" onClick={() => router.push("/dashboard")}>
        Back to Dashboard
      </Button>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Change Password</CardTitle>
          <CardDescription>
            This page will be invalid after{" "}
            {`${Math.floor(time / 60)}`.padStart(2, "0")}:
            {`${time % 60}`.padStart(2, "0")} mins.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <form onSubmit={submitForm}>
            <div className="grid gap-2">
              <Label htmlFor="old-password">Old Password</Label>
              <Input
                id="old-password"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-3 flex items-center justify-center">
            <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={setIsCaptchaVerified}
              />
              </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" onClick={submitForm} className="w-full">
            Change Password
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

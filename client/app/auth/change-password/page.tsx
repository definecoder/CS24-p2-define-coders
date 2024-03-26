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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChangePassword() {
  const router = useRouter();

  const { changePass, setPassChangeData } = useChangePass();

  const [correctCaptcha, setCorrectCaptcha] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [time, setTime] = useState(300);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);    
          alert("Time Expired!");      
          router.push("/dashboard");
          return 0;
        } else return time - 0.5;
      });
    }, 1000);
  }, []);

  async function submitForm() {
    setPassChangeData({ oldPassword, newPassword });
    correctCaptcha === userCaptcha &&
      (await changePass()) &&
      router.push("/dashboard");
    correctCaptcha !== userCaptcha && alert("Invalid Captcha!");
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen w-screen">
      <Button variant="outline" onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>      
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Change Password</CardTitle>
          <CardDescription>
            This page will be invalid after{" "}
            {`${Math.floor(time / 60)}`.padStart(2, "0")}:
            {`${time % 60}`.padStart(2, "0")} mins.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
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
            <CaptchaDiv
              setCorrectCaptcha={setCorrectCaptcha}
              setUserCaptcha={setUserCaptcha}
            />
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

"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";
import useForgetPassInitiate from "@/hooks/auth/useForgetPassInitiate";
import { useContext } from "react";

function ForgetPassInitiateForm() {
  const { userEmail, setUserEmail, initiate } = useForgetPassInitiate();
  const router = useRouter();  

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
        <Button type="submit" className="w-full">
          Send Reset Password Link
        </Button>
      </form>
    </>
  );
}
export default ForgetPassInitiateForm;

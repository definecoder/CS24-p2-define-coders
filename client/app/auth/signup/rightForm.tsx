"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import useSignup from "../../../hooks/auth/useSignup";
import { useRouter } from "next/navigation";

function RightForm() {
  const { signupData, setSignUpData, signup } = useSignup();
  const router = useRouter();

  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to Sign Up
          </p>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const sucess = await signup();
            sucess && router.push("/dashboard");
          }}
          className="grid gap-4"
        >
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="abcd@example.com"
              value={signupData.email}
              onChange={(e) =>
                setSignUpData({ ...signupData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={signupData.password}
              onChange={(e) =>
                setSignUpData({ ...signupData, password: e.target.value })
              }
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
export default RightForm;

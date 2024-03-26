"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import useLogin from "../../../hooks/auth/useLogin";
import { useRouter } from "next/navigation";

function LoginForm() {
  const { loginData, setloginData, login } = useLogin();
  const router = useRouter();  

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const sucess = await login();
    sucess && router.push("/dashboard");
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
            value={loginData.email}
            onChange={(e) =>
              setloginData({ ...loginData, email: e.target.value })
            }
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/auth/reset-password/initiate"
              className="ml-auto inline-block text-sm underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={loginData.password}
            onChange={(e) =>
              setloginData({ ...loginData, password: e.target.value })
            }
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </>
  );
}
export default LoginForm;

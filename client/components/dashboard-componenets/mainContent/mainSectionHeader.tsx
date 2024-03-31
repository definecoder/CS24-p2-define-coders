"use client";

import {
  CircleUser,
  CircleUserRound,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MobileMenu from "../mobileMenu/mobileMenu";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext } from "react";
import { NavContext } from "@/hooks/contexts/useNavCtx";
import { eraseCookie, getCookie } from "@/lib/cookieFunctions";
import {
  curActive,
  jwtToken,
  landfillName,
  role,
  stsId,
  stsName,
  username,
} from "@/data/cookieNames";
import { get } from "http";
import { admin, landfillManager, stsManager } from "@/data/roles";
import axios from "axios";
import { message } from "antd";

function logout(router: AppRouterInstance) {
  axios.post(
    "/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${getCookie(jwtToken)}`,
      },
    }
  );
  eraseCookie(role);
  eraseCookie(jwtToken);
  message.success("logged out successfully");
  router.push("/auth/login");
}

export default function MainSectionHeader({
  role,
  subsection,
}: {
  role: string;
  subsection: string;
}) {
  const router = useRouter();
  const { currentActive, setCurrentActive } = useContext(NavContext);
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between max-w-[100vw]">
      {/* Sheet for displaying menu in small screens */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <MobileMenu role={role} />
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main content of header */}
      <div className="min-w-80">
        <form className="w-full">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users, truck, sts..."
              className="w-full appearance-none bg-background pl-8 shadow-none"
            />
          </div>
        </form>
      </div>

      <div className="hidden xl:block">
        {getCookie(curActive)?.startsWith(stsManager) &&
          (getCookie(stsName) ? (
            <b>
              YOUR STS : <span> {getCookie(stsName).toUpperCase()} </span>
            </b>
          ) : (
            <>{"NO STS ASSIGNED"}</>
          ))}

        {getCookie(curActive)?.startsWith(landfillManager) &&
          (getCookie(landfillName) ? (
            <b>
              YOUR LANDFILL :{" "}
              <span> {getCookie(landfillName).toUpperCase()} </span>
            </b>
          ) : (
            <>{"NO LANDFILL ASSIGNED"}</>
          ))}

        {getCookie(curActive)?.startsWith(admin) && 
            <b>
              SYSTEM ADMIN OF ECOSYNC
            </b>}

      </div>

      {/* Profile Icon and dropdown menu */}
      <div className="flex gap-4 items-center">
        {getCookie(username)}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUserRound className="h-7 w-7" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                router.push("profile");
              }}
            >
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setCurrentActive(role + "-Settings")}
            >
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                router.push("auth/change-password");
              }}
            >
              Change Password
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-800 bg-red-100 bg-opacity-50"
              onClick={() => logout(router)}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

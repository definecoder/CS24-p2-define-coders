"use client";

import Link from "next/link";
import {
  Bell,
  CalendarCheck,
  Home,
  LayoutDashboard,
  LineChart,
  LucideIcon,
  Package,
  Package2,
  Receipt,
  ScanFace,
  Settings,
  ShoppingCart,
  Truck,
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
import { useContext, useState } from "react";
import { NavContext } from "@/hooks/contexts/useNavCtx";

const SidebarItem = ({
  Icon,
  title,
  active = true,
  onclick,
}: {
  Icon: LucideIcon;
  title: string;
  active?: boolean;
  onclick: () => void;
}) => {
  return (
    <div
      onClick={onclick}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer ${
        active && "text-primary bg-muted"
      }`}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {title}
    </div>
  );
};

function AdminSideBar() {
  const {currentActive, setCurrentActive} = useContext(NavContext);

  const SidebarItemList = [
    {
      Icon: LayoutDashboard,
      title: "Dashboard",
      active: false,
    },
    {
      Icon: Truck,
      title: "System",
      active: false,
    },
    {
      Icon: CalendarCheck,
      title: "Schedules",
      active: false,
    },
    {
      Icon: ScanFace,
      title: "Roles",
      active: false,
    },
    {
      Icon: Users,
      title: "Users",
      active: false,
    },
    {
      Icon: Receipt,
      title: "Bills",
      active: false,
    },
    {
      Icon: Settings,
      title: "Settings",
      active: false,
    },
  ];

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-20 items-center border-b px-4 lg:h-[80px] lg:px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <img
              src="/logoBlack.png"
              alt="logo"
              className="h-16 w-16 ml-2 mr-2"
            />
            <span className="">SYSTEM ADMIN</span>
          </Link>
        </div>

        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {SidebarItemList.map((item, index) => (
              <SidebarItem
                key={index}
                Icon={item.Icon}
                title={item.title}
                active={currentActive === index}
                onclick={() => setCurrentActive(index)}
              />
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <Card>
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Code Samurai 2024</CardTitle>
              <CardDescription>
                We are team define coders from SUST, SWE.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Our Repo link
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
export default AdminSideBar;

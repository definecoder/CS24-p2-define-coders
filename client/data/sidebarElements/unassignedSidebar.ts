import {
    Bell,
    CalendarCheck,
    CircleUserRound,
    Database,
    Home,
    LayoutDashboard,
    LineChart,
    LucideIcon,
    MessageCircle,
    Package,
    Package2,
    Receipt,
    ScanFace,
    Send,
    Settings,
    ShoppingCart,
    Truck,
    Users,
  } from "lucide-react";
import { unassigned } from "../roles";

export const UnassignedSidebarItemList = [
    {
      Icon: CircleUserRound,
      title: "My Profile",
    },
    {
      Icon: Send,
      title: "Contact Admin",
    },{
      Icon: Settings,
      title: "Settings",
    },
  ];

  export const unassignedStateList = () => {
    UnassignedSidebarItemList.map((item) => {
      return unassigned + "-" + item.title;
    });
  };
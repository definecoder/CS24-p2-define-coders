import {
    Bell,
    CalendarCheck,
    Database,
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
import { landfillManager } from "../roles";

export const LandfillManagerSidebarItemList = [
    {
      Icon: LayoutDashboard,
      title: "Dashboard",
    },
    {
      Icon: CalendarCheck,
      title: "Schedules",
    },
    {
      Icon: Database,
      title: "Storage",
    },
    {
      Icon: Truck,
      title: "Dump Entry",
    },
    {
      Icon: Receipt,
      title: "Bills",
    }, 
    {
      Icon: Settings,
      title: "Settings",
    },
  ];

  export const landfillManagerStateList = () => {
    LandfillManagerSidebarItemList.map((item) => {
      return landfillManager + "-" + item.title;
    });
  };
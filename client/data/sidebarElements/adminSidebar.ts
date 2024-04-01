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
import { admin } from "../roles";

export const AdminSidebarItemList = [
  {
    Icon: LayoutDashboard,
    title: "Dashboard",
  },
  {
    Icon: CalendarCheck,
    title: "Schedules",
  },
  {
    Icon: ScanFace,
    title: "Roles",
  },
  {
    Icon: Users,
    title: "Users",
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

export const adminStateList = () => {
  AdminSidebarItemList.map((item) => {
    return admin + "-" + item.title;
  });
};

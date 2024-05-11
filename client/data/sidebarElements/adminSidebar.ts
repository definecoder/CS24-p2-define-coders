import {
  Bell,
  CalendarCheck,
  Home,
  LayoutDashboard,
  LineChart,
  LucideIcon,
  Package,
  Package2,
  Pickaxe,
  Receipt,
  ScanFace,
  Settings,
  ShoppingCart,
  Truck,
  UserCog,
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
    Icon: UserCog,
    title: "Contracts",
  },  
  {
    Icon: Pickaxe,
    title: "Workforce",
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

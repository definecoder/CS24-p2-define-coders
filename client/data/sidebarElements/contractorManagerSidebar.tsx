import {
    Bell,
    BookOpen,
    Building2,
    CalendarCheck,
    CircleUserRound,
    Database,
    History,
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
    User2,
    Users,
  } from "lucide-react";
import { unassigned } from "../roles";

export const ContractorManagerSidebarItemList = [
    {
      Icon: Home,
      title: "Dashboard",
    },
    {
      Icon: User2,
      title: "Employees",
    },{
      Icon: Receipt,
      title: "Bills",
    },
    {
        Icon: BookOpen,
        title: "Collection Plan",
    },
    {
        Icon: History,
        title: "Schedule",
    },
    {
        Icon: Building2,
        title: "Company Details",
    }
  ];

  export const unassignedStateList = () => {
    ContractorManagerSidebarItemList.map((item) => {
      return unassigned + "-" + item.title;
    });
  };
import { LucideIcon } from "lucide-react";
import { AdminSidebarItemList } from "./adminSidebar";
import { LandfillManagerSidebarItemList } from "./landfillManagerSidebar";
import { STSManagerSidebarItemList } from "./stsManagerSidebar";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { UnassignedSidebarItemList } from "./unassignedSidebar";

export interface SidebarElement {Icon: LucideIcon, title: string}

export const getSidebarElements = (role: string):SidebarElement[] => {
    if (role === admin) return AdminSidebarItemList;
    else if (role === landfillManager) return LandfillManagerSidebarItemList;
    else if (role === stsManager) return STSManagerSidebarItemList;
    else if(role === unassigned) return UnassignedSidebarItemList;
    return [];
}
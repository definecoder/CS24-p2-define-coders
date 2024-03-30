import InvalidSate from "./InvalidState";
import { landfillManager } from "@/data/roles";
import LandfillManagerDashboard from "../../components/dashboard-componenets/mainContent/landFillManagerContents/Dashboard";
import LandfillManagerSchedules from "../../components/dashboard-componenets/mainContent/landFillManagerContents/Schedules";
import LandfillManagerStorageData from "../../components/dashboard-componenets/mainContent/landFillManagerContents/Storage";
import LandfillManagerDumpEntries from "../../components/dashboard-componenets/mainContent/landFillManagerContents/DumpEntry";
import LandfillManagerSettings from "../../components/dashboard-componenets/mainContent/landFillManagerContents/Settings";
import LandfillManagerBillsManagementPanel from "@/components/dashboard-componenets/mainContent/landFillManagerContents/LandfillManagerBills";

export function getContentsOfLandfillManager(state: string) {
    switch (state) {
      case landfillManager + "-Dashboard":
        return <LandfillManagerDashboard />;
      case landfillManager + "-Schedules":
        return <LandfillManagerSchedules />;
      case landfillManager + "-Storage":
        return <LandfillManagerStorageData />;
      case landfillManager + "-Dump Entry":
        return <LandfillManagerDumpEntries />;
      case landfillManager + "-Bills":
        return <LandfillManagerBillsManagementPanel />;      
      case landfillManager + "-Settings":
        return <LandfillManagerSettings />;
      default:
        return InvalidSate();
    }
  }
import InvalidSate from "./InvalidState";
import { stsManager } from "@/data/roles";
import STSManagerDashboard from "../../components/dashboard-componenets/mainContent/stsManagerContents/Dashboard";
import STSManagerSchedules from "../../components/dashboard-componenets/mainContent/stsManagerContents/Schedules";
import STSManagerStorageData from "../../components/dashboard-componenets/mainContent/stsManagerContents/Storage";
import STSManagerDumpEntries from "../../components/dashboard-componenets/mainContent/stsManagerContents/DumpEntry";
import STSManagerSettings from "../../components/dashboard-componenets/mainContent/stsManagerContents/Settings";

export function getContentsOfSTSManager(state: string) {
    switch (state) {
      case stsManager + "-Dashboard":
        return <STSManagerDashboard />;
      case stsManager + "-Schedules":
        return <STSManagerSchedules />;
      case stsManager + "-Storage":
        return <STSManagerStorageData />;
      case stsManager + "-Dump Entry":
        return <STSManagerDumpEntries />;
      case stsManager + "-Settings":
        return <STSManagerSettings />;
      default:
        return InvalidSate();
    }
  }
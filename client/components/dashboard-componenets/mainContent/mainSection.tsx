"use client";

import { useContext, useEffect } from "react";
import { NavContext } from "@/hooks/contexts/useNavCtx";
import MainSectionHeader from "./mainSectionHeader";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import AdminDashboard from "./systemAdminContents/dashboard";
import AdminSystemDataPanel from "./systemAdminContents/system";
import AdminSchedulePanel from "./systemAdminContents/Schedule";
import AdminRolesManagementPanel from "./systemAdminContents/Roles";
import AdminUserManagementPanel from "./systemAdminContents/Users";
import AdminBillsManagementPanel from "./systemAdminContents/Bills";
import AdminSettingsPanel from "./systemAdminContents/Settings";
import LandfillManagerDashboard from "./landFillManagerContents/Dashboard";
import LandfillManagerSchedules from "./landFillManagerContents/Schedules";
import LandfillManagerStorageData from "./landFillManagerContents/Storage";
import LandfillManagerDumpEntries from "./landFillManagerContents/DumpEntry";
import LandfillManagerSettings from "./landFillManagerContents/Settings";
import STSManagerDashboard from "./stsManagerContents/Dashboard";
import STSManagerSchedules from "./stsManagerContents/Schedules";
import STSManagerStorageData from "./stsManagerContents/Storage";
import STSManagerDumpEntries from "./stsManagerContents/DumpEntry";
import STSManagerSettings from "./stsManagerContents/Settings";

function InvalidSate() {
  return (
    <div className="flex flex-1 max-h-[calc(100vh-60px)]">
      <div className="flex flex-col flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm text-lg text-gray-500">
        <img src="/logoBlack.png" alt="Logo" className="h-1/6" />
        <h1 className="text-3xl  text-black font-semibold md:text-4xl m-2">
          INVALID STATE
        </h1>
        The state you are trying to access is invalid.
      </div>
    </div>
  );
}

function getContentsOfAdmin(state: string) {
  switch (state) {
    case admin + "-Dashboard":
      return <AdminDashboard />;
    case admin + "-System":
      return <AdminSystemDataPanel />;
    case admin + "-Schedules":
      return <AdminSchedulePanel />;
    case admin + "-Roles":
      return <AdminRolesManagementPanel />;
    case admin + "-Users":
      return <AdminUserManagementPanel />;
    case admin + "-Bills":
      return <AdminBillsManagementPanel />;
    case admin + "-Settings":
      return <AdminSettingsPanel />;
    default:
      return InvalidSate();
  }
}

function getContentsOfLandfillManager(state: string) {
  switch (state) {
    case landfillManager + "-Dashboard":
      return <LandfillManagerDashboard />;
    case landfillManager + "-Schedules":
      return <LandfillManagerSchedules />;
    case landfillManager + "-Storage":
      return <LandfillManagerStorageData />;
    case landfillManager + "-Dump Entry":
      return <LandfillManagerDumpEntries />;
    case landfillManager + "-Settings":
      return <LandfillManagerSettings />;
    default:
      return InvalidSate();
  }
}

function getContentsOfSTSManager(state: string) {
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

function getContentsOfUnassigned(state: string) {
  switch (state) {
    case "admin-Dashboard":
      return <AdminDashboard />;
    default:
      return InvalidSate();
  }
}

function getDashboardFor(state: string) {
  if (state.startsWith(admin)) return getContentsOfAdmin(state);
  else if (state.startsWith(stsManager)) return getContentsOfSTSManager(state);
  else if (state.startsWith(landfillManager))
    return getContentsOfLandfillManager(state);
  else if (state.startsWith(unassigned)) return getContentsOfUnassigned(state);
  else return InvalidSate();
}

function MainSection({ role = "unassigned" }: { role: string }) {
  const currentState = useContext(NavContext)?.currentActive;

  return (
    <div className="flex flex-col">
      <MainSectionHeader role={role} subsection={currentState} />

      {getDashboardFor(currentState)}
    </div>
  );
}
export default MainSection;

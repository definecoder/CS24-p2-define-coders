import InvalidSate from "./InvalidState";
import { admin } from "@/data/roles";
import AdminDashboard from "../../components/dashboard-componenets/mainContent/systemAdminContents/Dashboard";
import AdminSystemDataPanel from "../../components/dashboard-componenets/mainContent/systemAdminContents/System";
import AdminSchedulePanel from "../../components/dashboard-componenets/mainContent/systemAdminContents/Schedule";
import AdminRolesManagementPanel from "../../components/dashboard-componenets/mainContent/systemAdminContents/Roles";
import AdminUserManagementPanel from "../../components/dashboard-componenets/mainContent/systemAdminContents/Users";
import AdminBillsManagementPanel from "../../components/dashboard-componenets/mainContent/systemAdminContents/Bills";
import AdminSettingsPanel from "../../components/dashboard-componenets/mainContent/systemAdminContents/Settings";

export function getContentsOfAdmin(state: string) {
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
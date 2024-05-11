import InvalidSate from "./InvalidState";
import { contractorManager } from "@/data/roles";
import UnassignedMyProfilePanel from "../../components/dashboard-componenets/mainContent/unassignedContents/MyProfile";
import UnassignedContactAdmiPanel from "../../components/dashboard-componenets/mainContent/unassignedContents/ContactAdmin";
import UnassignedSettingsPanel from "../../components/dashboard-componenets/mainContent/unassignedContents/Settings";
import EmployeePanel from "@/components/dashboard-componenets/mainContent/contractManagerContents/Employees";
import CollectionPlanPanel from "@/components/dashboard-componenets/mainContent/contractManagerContents/CollectionPlan";
import ContractorManagerSchedule from "@/components/dashboard-componenets/mainContent/contractManagerContents/Schedule";
import ContractManagerDashboard from "@/components/dashboard-componenets/mainContent/contractManagerContents/Dashboard";
import ContractManagerBillManagementPanel from "@/components/dashboard-componenets/mainContent/contractManagerContents/Bills";
import CompanyDetails from "@/components/dashboard-componenets/mainContent/contractManagerContents/CompanyDetails";

export function getContentsOfContractorManager(state: string) {
    switch (state) {
      case contractorManager + "-Dashboard":
        return <ContractManagerDashboard />;
      case contractorManager + "-Employees":
        return <EmployeePanel />;
      case contractorManager + "-Bills":
        return <ContractManagerBillManagementPanel />;
      case contractorManager + "-Collection Plan":
        return <CollectionPlanPanel />;
      case contractorManager + "-Schedule":
        return <ContractorManagerSchedule />;
      case contractorManager + "-Company Details":
        return <CompanyDetails />;
      default:
        return InvalidSate();
    }
  }
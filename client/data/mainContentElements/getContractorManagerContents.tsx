import InvalidSate from "./InvalidState";
import { contractorManager } from "@/data/roles";
import UnassignedMyProfilePanel from "../../components/dashboard-componenets/mainContent/unassignedContents/MyProfile";
import UnassignedContactAdmiPanel from "../../components/dashboard-componenets/mainContent/unassignedContents/ContactAdmin";
import UnassignedSettingsPanel from "../../components/dashboard-componenets/mainContent/unassignedContents/Settings";
import EmployeePanel from "@/components/dashboard-componenets/mainContent/contractManagerContents/Employees";
import CollectionPlanPanel from "@/components/dashboard-componenets/mainContent/contractManagerContents/CollectionPlan";
import ContractorManagerSchedule from "@/components/dashboard-componenets/mainContent/contractManagerContents/Schedule";

export function getContentsOfContractorManager(state: string) {
    switch (state) {
      case contractorManager + "-Dashboard":
        return <UnassignedMyProfilePanel />;
      case contractorManager + "-Employees":
        return <EmployeePanel />;
      case contractorManager + "-Bills":
        return <UnassignedMyProfilePanel />;
      case contractorManager + "-Collection Plan":
        return <CollectionPlanPanel />;
      case contractorManager + "-Schedule":
        return <ContractorManagerSchedule />;
      case contractorManager + "-Company Details":
        return <UnassignedMyProfilePanel />;
      default:
        return InvalidSate();
    }
  }
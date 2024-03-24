import InvalidSate from "./InvalidState";
import { unassigned } from "@/data/roles";
import UnassignedMyProfilePanel from "../../components/dashboard-componenets/mainContent/unassignedContents/MyProfile";
import UnassignedContactAdmiPanel from "../../components/dashboard-componenets/mainContent/unassignedContents/ContactAdmin";
import UnassignedSettingsPanel from "../../components/dashboard-componenets/mainContent/unassignedContents/Settings";

export function getContentsOfUnassigned(state: string) {
    switch (state) {
      case unassigned + "-My Profile":
        return <UnassignedMyProfilePanel />;
      case unassigned + "-Contact Admin":
        return <UnassignedContactAdmiPanel />;
      case unassigned + "-Settings":
        return <UnassignedSettingsPanel />;    
      default:
        return InvalidSate();
    }
  }
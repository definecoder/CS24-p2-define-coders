import InvalidSate from "./InvalidState";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getContentsOfAdmin } from "./getAdminContents";
import {getContentsOfLandfillManager} from "./getLandfillContents";
import { getContentsOfSTSManager } from "./getSTSContents";
import { getContentsOfUnassigned } from "./getUnassignedContents";

export default function getDashboardFor(state: string | null) {
   
    if (state?.startsWith(admin)) return getContentsOfAdmin(state);
    else if (state?.startsWith(stsManager)) return getContentsOfSTSManager(state);
    else if (state?.startsWith(landfillManager))
      return getContentsOfLandfillManager(state);
    else if (state?.startsWith(unassigned)) return getContentsOfUnassigned(state);
    else return InvalidSate();
}
import InvalidSate from "./InvalidState";
import { admin, landfillManager, stsManager, unassigned, contractorManager } from "@/data/roles";
import { getContentsOfAdmin } from "./getAdminContents";
import {getContentsOfLandfillManager} from "./getLandfillContents";
import { getContentsOfSTSManager } from "./getSTSContents";
import { getContentsOfUnassigned } from "./getUnassignedContents";
import { getContentsOfContractorManager } from "./getContractorManagerContents";

export default function getDashboardFor(state: string | null) {
   
    if (state?.startsWith(admin)) return getContentsOfAdmin(state);
    else if (state?.startsWith(stsManager)) return getContentsOfSTSManager(state);
    else if (state?.startsWith(landfillManager))
      return getContentsOfLandfillManager(state);
    else if (state?.startsWith(unassigned)) return getContentsOfUnassigned(state);
    else if(state?.startsWith(contractorManager)) return getContentsOfContractorManager(state);
    else return InvalidSate();
}
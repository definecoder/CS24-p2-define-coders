export const admin = "SYSTEM_ADMIN";
export const stsManager = "STS_MANAGER";
export const landfillManager = "LAND_MANAGER";
export const unassigned = "UNASSIGNED";
export const contractor = "CONTRACTOR";

export const roleList = [unassigned, admin, landfillManager, stsManager];

export type ContractorManager = {
    id: string;
    username: string;
    email: string;
    contactNumber: string;
    createdAt: string;    
    ContractorId: string;
};

export type Contractor = {
  id: string;
  name: string;
  registrationId: string;
  tinNumber: string;
  contactNumber: string;
  workforceSize: number;
  paymentPerTon: number;
  requiredWastePerDay: number;
  contractDuration: number;
  area: string;
  assignedSTS: string;
  manager: ContractorManager;
};
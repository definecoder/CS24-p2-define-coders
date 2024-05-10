export const admin = "SYSTEM_ADMIN";
export const stsManager = "STS_MANAGER";
export const landfillManager = "LAND_MANAGER";
export const unassigned = "UNASSIGNED";
export const contractorManager = "CONTRACTOR_MANAGER";

export const roleList = [unassigned, admin, landfillManager, stsManager];

export type ContractorManager = {
    id?: string;
    username: string;
    email: string;
    password?: string;
    contactNumber: string;
    createdAt?: string;    
    contractorId: string;
};

export type Contractor = {
  id?: string;
  name: string;
  registrationId: string;
  tinNumber: string;
  contactNumber: string;
  workforceSize: number;
  paymentPerTon: number;
  requiredWastePerDay: number;
  contractDuration: string;
  area: string;
  stsId: string;
  manager?: ContractorManager;
};
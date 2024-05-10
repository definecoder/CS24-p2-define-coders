export const baseUrl = "http://localhost:8585"; // Local
// export const baseUrl = "http://13.250.36.61"; // AWS

export const apiRoutes = {
  auth: {
    login: `${baseUrl}/auth/login`,
    create: `${baseUrl}/auth/create`,
    logout: `${baseUrl}/auth/logout`,
    resetInitiate: `${baseUrl}/auth/reset-password/initiate`,
    confirmPass: `${baseUrl}/auth/reset-password/confirm`,
    changePass: `${baseUrl}/auth/change-password/`,
  },
  user: {
    getAll: `${baseUrl}/users`,
    delete: `${baseUrl}/users/`,
    edit: `${baseUrl}/users/`,
  },
  area: {
    create: `${baseUrl}/route-areas/add-area`,
    getAll: `${baseUrl}/route-areas/area`,
    delete: `${baseUrl}/areas/`,
    edit: `${baseUrl}/areas/`,
  },  
  route: {
    create: `${baseUrl}/route-areas/add-route`,
    getAll: `${baseUrl}/route-areas/routes`,
    delete: `${baseUrl}/areas/`,
    edit: `${baseUrl}/areas/`,
  },  
  sts: {
    create: `${baseUrl}/sts/create`,
    getAll: `${baseUrl}/sts`,
    delete: `${baseUrl}/sts/`,
    edit: `${baseUrl}/sts/`,
    getById: `${baseUrl}/sts/`,    
    vehicle: {
      create: `${baseUrl}/sts-entry/create`,
      delete: `${baseUrl}/sts-entry/`,
      entry: `${baseUrl}/sts-entry/create`,
      ongoing: `${baseUrl}/sts-entry/`,
      current: `${baseUrl}/sts-entry/`,
    },
  },
  contractor: {
    create: `${baseUrl}/contractors/create`,
    getAll: `${baseUrl}/contractors`,
    delete: `${baseUrl}/contractors/`,
    edit: `${baseUrl}/contractors/`,
    manager: {
      create: `${baseUrl}/auth/createmanager`,
      getAll: `${baseUrl}/contractor-managers`,
      delete: `${baseUrl}/contractor-managers/`,
      edit: `${baseUrl}/contractor-managers/`,
    },
  },
  employee: {
    create: `${baseUrl}/auth/createempolyee`,
    getAll: `${baseUrl}/employees`,
    delete: `${baseUrl}/employees/`,
    edit: `${baseUrl}/employees/`,
  },
  landfill: {
    getbyId: `${baseUrl}/landfills/`,
    create: `${baseUrl}/landfills/create`,
    getAll: `${baseUrl}/landfills`,
    delete: `${baseUrl}/landfills/`,
    edit: `${baseUrl}/landfills/`,
    getAllIncomingVehicles: `${baseUrl}/trips/search?tripStatus=PENDING&landfillId=`,
    getAllRecievedVechicleHistory: `${baseUrl}/trips/search?tripStatus=BILLED&landfillId=`,
  },
  rbac: {
    create: `${baseUrl}/rbac/roles`,
    getByRole: `${baseUrl}/rbac/roles/get/`,
    delete: `${baseUrl}/rbac/roles/delete/`,
    deletePermisson: `${baseUrl}/rbac/roles/`,
    edit: `${baseUrl}/rbac/roles/`,
    getAllRolesWithPermisson: `${baseUrl}/rbac/all`,
    fetchAllPermissons: `${baseUrl}/rbac/permissions`,
  },
  vehicle: {
    create: `${baseUrl}/vehicles/create`,
    getAll: `${baseUrl}/vehicles`,
    delete: `${baseUrl}/vehicles/`,
    edit: `${baseUrl}/vehicles/`,
  },
  trip: {
    create: `${baseUrl}/trips/create`,
    getAll: `${baseUrl}/trips`,
    delete: `${baseUrl}/trips/`,
    edit: `${baseUrl}/trips/`,
    search: `${baseUrl}/trips/search`,
    complete: `${baseUrl}/trips/complete`,
  },
  bills: {
    makeBill: `${baseUrl}/bills/create-from-trip/`,
    search: `${baseUrl}/bills/search`,
    getAll: `${baseUrl}/bills`,
  },
  profile: {
    getProfile: `${baseUrl}/profile`,
    edit: `${baseUrl}/profile`,
  },
  logs: {
    getAll: `${baseUrl}/logs/admin`,
  },
  plans: {
    create: `${baseUrl}/collection-plans/create`,
    getAll: `${baseUrl}/plans`,
    delete: `${baseUrl}/plans/`,
    edit: `${baseUrl}/plans/`,
  },
};

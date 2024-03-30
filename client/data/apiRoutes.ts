const baseUrl = 'http://localhost:8585';

export const apiRoutes = {
    auth: {
        login: `${baseUrl}/auth/login`,
        create: `${baseUrl}/auth/create`,
        logout: `${baseUrl}/auth/logout`,
        resetInitiate: `${baseUrl}/auth/reset-password/initiate`,
        confirmPass: `${baseUrl}/auth/reset-password/confirm`,
        changePass: `${baseUrl}/auth/change-password/`
    },
    user: {
        getAll: `${baseUrl}/users`,
        delete: `${baseUrl}/users/`,
        edit: `${baseUrl}/users/`,
    },
    sts: {
        create: `${baseUrl}/sts/create`,
        getAll: `${baseUrl}/sts`,
        delete: `${baseUrl}/sts/`,
        edit: `${baseUrl}/sts/`,
        vehicle: {           
            create: `${baseUrl}/sts-entry/create`,  
            delete: `${baseUrl}/sts-entry/`,            
        },
    },
    landfill: {
        getbyId: `${baseUrl}/landfills/`,
        create: `${baseUrl}/landfills/create`,
        getAll: `${baseUrl}/landfills`,
        delete: `${baseUrl}/landfills/`,
        edit: `${baseUrl}/landfills/`,
        getAllIncomingVehicles: `${baseUrl}/trips/search?tripStatus=PENDING&landfillId=`,
        getAllRecievedVechicleHistory: `${baseUrl}/trips/search?tripStatus=DELIVERED&landfillId=`,
    },
    rbac: {

        create: `${baseUrl}/rbac/roles`,
        getByRole: `${baseUrl}/rbac/roles/get/`,
        delete: `${baseUrl}/rbac/roles/delete/`,
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
    },
    profile: {
        getProfile: `${baseUrl}/profile`,
        edit: `${baseUrl}/profile`,
    }
}
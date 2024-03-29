const baseUrl = 'http://localhost:8585';

export const apiRoutes = {
    auth: {
        login: `${baseUrl}/auth/login`,
        create: `${baseUrl}/auth/create`,
        logout: `${baseUrl}/auth/logout`,
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
            delete: `${baseUrl}/sts-entry/`,            
        },
    },
    landfill: {
        create: `${baseUrl}/landfills/create`,
        getAll: `${baseUrl}/landfills`,
        delete: `${baseUrl}/landfills/`,
        edit: `${baseUrl}/landfills/`,
    },
    rbac: {
        create: `${baseUrl}/rbac/create`,
        getByRole: `${baseUrl}/rbac/roles/get/`,
        delete: `${baseUrl}/rbac/`,
        edit: `${baseUrl}/rbac/`,
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
    },
    bills: {
        makeBill: `${baseUrl}/bills/create-from-trip/`,
        search: `${baseUrl}/bills/search`,
    },
}
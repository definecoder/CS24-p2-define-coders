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
    },
}
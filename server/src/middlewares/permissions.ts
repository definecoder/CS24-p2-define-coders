import { PERMISSIONS, getPermittedRoles } from "../permissions/permissions";
import { User } from "../types/custom";

const canCreateUser = (user: User) => {
  const permittedRoles = getPermittedRoles(PERMISSIONS.CREATE_USER);
  return user.role ? permittedRoles.includes(user.role) : false;
};

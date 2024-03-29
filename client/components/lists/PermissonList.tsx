"usr client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import EmptyFillContainer from "../dashboard-componenets/cards/EmptyFillContainer";
import { use, useEffect, useState } from "react";
import useGetAllRole from "@/hooks/user_data/useGetAllRole";
import { fetchAllPermissons } from "@/hooks/user_data/getAllPermissonList";
import { set } from "react-hook-form";

type RolesWithPermisson = {
  id: string;
  name: string;
  permissions: [
    {
      name: string;
      description: string;
    }
  ];
};

type Permisson = {
    name: string;
    description: string;
    };

function PermissonList() {
  const { fetchAllRoles, rolesWithPermissions } = useGetAllRole();
  const [roles, setRoles] = useState<RolesWithPermisson[]>([]);
  const [permissions, setPermissions] = useState<Permisson[]>([]);
  
  async function getPermissons() {
    setPermissions(await fetchAllPermissons());    
  }  
  
  useEffect(() => {
    fetchAllRoles();    
    getPermissons();
  }, []);

  useEffect(() => {
    setRoles(rolesWithPermissions);
    setSelectedRole(rolesWithPermissions[0]?.name);
  }, [rolesWithPermissions]);

  const [selectedRole, setSelectedRole] = useState<string>();

  return (
    <>
      <RadioGroup
        className="flex flex-wrap justify-center content-center gap-4 w-full mb-2"
        onValueChange={(e) => setSelectedRole(e)}
      >
        {roles.map((role) => (
          <div key={role.id} className="flex items-center space-x-2">
            <RadioGroupItem value={role.name} className="hidden" id={role.id} />
            <Label htmlFor={role.id}>
              <div
                className={ "hover:cursor-pointer hover:scale-125 " + 
                  (selectedRole === role.name
                    ? "p-2.5 border text-card rounded-lg bg-card-foreground tracking-wider capitalize shadow-md border-black shadow-slate-600"
                    : "text-card-forground bg-card shadow-lg rounded-lg p-2")
                }
              >
                {role.name}
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>

      {selectedRole ? (
        <div className="mt-4 flex flex-col gap-2">
          <div className="grid grid-cols-1 gap-2">
            {roles
              .filter((role) => role.name === selectedRole)
              .map((role) => (
                <div key={role.id} className="mt-4 flex flex-wrap gap-4 w-full content-center justify-center">                    
                  {permissions.map((permission) => (
                    <div
                      key={permission.name}
                      className={"flex flex-col gap-1 my-2 px-6 py-4 bg-green-100 text-card-foreground shadow-md rounded-lg hover:cursor-pointer hover:scale-110 hover:text-white" + 
                        (role.permissions.find((perm) => perm.name === permission.name)
                          ? " bg-green-500"
                          : " bg-red-500")
                        }
                    >
                      <h1 className="text-lg font-bold">{permission.name}</h1>
                      <p className="text-sm">{permission.description}</p>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      ) : (
        <EmptyFillContainer>
          <h1 className="text-lg">Select a role to view permissions</h1>
        </EmptyFillContainer>
      )}
    </>
  );
}
export default PermissonList;

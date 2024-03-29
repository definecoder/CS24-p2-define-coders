"usr client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import EmptyFillContainer from "../dashboard-componenets/cards/EmptyFillContainer";
import { use, useEffect, useState } from "react";
import useGetAllRole from "@/hooks/user_data/useGetAllRole";
import { fetchAllPermissons } from "@/hooks/user_data/getAllPermissonList";
import { set } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { updatePermisson } from "@/hooks/user_data/updatePermisson";

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

type EditPermisson = {
  role: string;
  permission: string;
  action: string;
};

function PermissonList() {
  const { fetchAllRoles, rolesWithPermissions } = useGetAllRole();
  const [roles, setRoles] = useState<RolesWithPermisson[]>([]);
  const [permissions, setPermissions] = useState<Permisson[]>([]);
  const [msg, setMsg] = useState<EditPermisson>();

  async function getPermissons() {
    setPermissions(await fetchAllPermissons());
  }

  useEffect(() => {
    fetchAllRoles();
    getPermissons();
  }, []);

  useEffect(() => {
    setRoles(rolesWithPermissions);
    //setSelectedRole(rolesWithPermissions[0]?.name);
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
                className={
                  "hover:cursor-pointer hover:scale-125 " +
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
                <AlertDialog>
                  <AlertDialogTrigger>
                    <div
                      key={role.id}
                      className="mt-4 flex flex-wrap gap-4 w-full content-center justify-center"
                    >
                      {permissions.map((permission) => (
                        <div
                          key={permission.name}
                          onClick={async () => {
                            const str = role.permissions.find(
                              (perm) => perm.name === permission.name
                            )
                              ? "REMOVE"
                              : "ADD";
                            await setMsg({
                              role: role.name,
                              permission: permission.name,
                              action: str,
                            });
                          }}
                          className={
                            "flex flex-col gap-1 my-2 px-6 py-4 bg-green-100 text-card-foreground shadow-md rounded-lg hover:cursor-pointer hover:scale-110 hover:text-white" +
                            (role.permissions.find(
                              (perm) => perm.name === permission.name
                            )
                              ? " bg-green-500"
                              : " bg-red-500")
                          }
                        >
                          <h1 className="text-lg font-bold">
                            {permission.name}
                          </h1>
                          <p className="text-sm">{permission.description}</p>
                        </div>
                      ))}
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex justify-center items-center mt-3">
                        <div className="text-center">
                          CONFIRM THAT YOU WANT TO{" "}
                          {msg?.action === "ADD" ? (
                            <div>
                              <span className="text-green-700">
                                ADD "{msg?.permission}"
                              </span>{" "}
                              PERMISSION TO{" "}
                            </div>
                          ) : (
                            <div>
                              <span className="text-red-700">
                                REMOVE "{msg?.permission}"
                              </span>{" "}
                              PERMISSION FROM{" "}
                            </div>
                          )}
                          <i>{msg?.role}</i> ?
                        </div>
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        <div className="flex flex-col justify-center items-center my-5">
                          <div>
                            ACTION : <b>{msg?.action} PERMISSON</b>
                          </div>
                          <div>
                            ROLE : <b>{msg?.role}</b>
                          </div>
                          <div>
                            PERMISSION : <b>{msg?.permission}</b>
                          </div>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () => {
                          msg && alert(await updatePermisson(msg));
                          await fetchAllRoles();
                          setMsg(undefined);
                        }}
                      >
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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

{
  /* <AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Show Dialog</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>; */
}

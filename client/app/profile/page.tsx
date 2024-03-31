"use client";
import BackgroundComponent from "@/components/profile/backgroundComp";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useGetUserProfile from "@/hooks/user_data/useGetUserProfile";
import { PersonIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { EditIcon, Factory, CircleUser } from "lucide-react";
import { useEffect, useState } from "react";
import { ProfileEditModal } from "@/components/modals/ProfileEditModal";
import useGetAllRole from "@/hooks/user_data/useGetAllRole";
import { UpdateStsStorage } from "@/components/modals/stsControl/updateSTSStorage";
import { UpdateLandfillStorageModal } from "@/components/modals/landfillControl/updateLandfillStorage";

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

export default function ProfilePage() {
  const router = useRouter();
  const { user, stsDetails, landfillDetails, getUserDetails } =
    useGetUserProfile(); // Destructure user and getUserDetails
  const [role, setRole] = useState<string>("Role Name");
  // const [permissions, setPermissions] = useState<RolesWithPermisson[]>([]);
  const RolePlace = "Station";
  const { fetchAllRoles, roles, rolesWithPermissions } = useGetAllRole();
  useEffect(() => {
    const fetchData = async () => {
      await getUserDetails();
      await fetchAllRoles();

      setRole(user.roleName);
    };

    fetchData();
  }, []);

  return (
    <div className="w-screen h-fit ">
      <BackgroundComponent />
      <Button
        variant="outline"
        className="absolute top-[40px] m-24 mx-40"
        onClick={() => router.push("/dashboard")}
      >
        Back to Dashboard
      </Button>
      <div className="absolute top-[20px] right-[100px] text-3xl text-white flex">
        {user.roleName}
        <CircleUser className="mx-2 h-8 w-8" />
      </div>
      <div className="absolute top-[85px] w-4/5 mx-40 my-24  h-4/6 flex ">
        <div className="h-full w-96 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground p-10 rounded-xl flex flex-col justify-center items-center gap-8">
          <Avatar className="w-24 h-24">
            <AvatarFallback>
              <PersonIcon className="w-3/6 h-3/6" />
            </AvatarFallback>
          </Avatar>
          <h1 className="font-bold text-xl">Profile Page</h1>
          <div className="flex flex-col justify-center items-center">
            {/* <h1><span className="font-bold">ID: </span>{user.id}</h1> */}
            <p>
              <span className="font-bold">Email: </span>
              {user.email}
            </p>
            <p>
              <span className="font-bold">Role: </span>
              {user.roleName}
            </p>
            <p>
              <span className="font-bold">Profile Name: </span>
              {user.profileName}
            </p>
            <p>
              <span className="font-bold">Username: </span>
              {user.username}
            </p>
            <p>
              <span className="font-bold">Role Description: </span>
              {user.roleDescription}
            </p>
          </div>
          <ProfileEditModal profileInfo={user} />
        </div>

        <div className="h-fit w-4/6 ml-32 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground p-10 rounded-xl flex flex-col justify-center items-center gap-8">
          <Factory className="w-24 h-24" />

          {user?.roleName === "STS_MANAGER" &&
            stsDetails?.stsId?.toString().length > 1 && (
              <div>
                <div className="font-bold text-2xl mb-4">STS Details</div>
                <p>
                  <span className="font-bold">Id: </span>
                  {stsDetails.stsId}
                </p>
                <p>
                  <span className="font-bold">STS Name: </span>
                  {stsDetails.stsName}
                </p>
                <p>
                  <span className="font-bold">Ward Number: </span>
                  {stsDetails.stsWardNumber}
                </p>
                <p>
                  <span className="font-bold">Capacity: </span>
                  {stsDetails.stsCapacity}
                </p>
                <p>
                  <span className="font-bold">Current Total Waste: </span>
                  {stsDetails.stsCurrentTotalWaste}
                </p>
                <p>
                  <span className="font-bold">Coordinate: </span>
                  {stsDetails.stsLatitude}, {stsDetails.stsLongitude}
                </p>              
              </div>
            )}

          {user?.roleName === "STS_MANAGER" &&
            stsDetails?.stsId?.toString().length < 1 && (
              <div>
                <div className="font-bold text-2xl my-4">STS Not Assigned</div>
                Call your admin to assign your STS.
              </div>
            )}
          {user?.roleName === "STS_MANAGER" &&
            rolesWithPermissions.some(
              (role) => role.name === "STS_MANAGER"
            ) && (
              <div>
                <h1 className="text-xl mb-3">
                  <b>Land Manager Permissions:</b>
                </h1>
                <div className="flex flex-wrap items-center justify-center ">
                  {rolesWithPermissions
                    .find((role) => role.name === "STS_MANAGER")
                    ?.permissions.map((permission) => (
                      <div
                        key={permission.name}
                        className="border-2 border-slate-400 m-2 p-3 bg-slate-300 rounded-xl"
                      >
                        <div>
                          <strong>{permission.name}:</strong>
                        </div>
                        <div> {permission.description} </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

          {user?.roleName === "LAND_MANAGER" &&
            landfillDetails?.landfillId?.toString().length > 1 && (
              <div>
                <div className="font-bold text-2xl my-4">Landfill Details </div>
                <p>
                  <span className="font-bold">ID: </span>
                  {landfillDetails.landfillId}
                </p>
                <p>
                  <span className="font-bold">Landfill Name: </span>
                  {landfillDetails.landFillName}
                </p>
                <p>
                  <span className="font-bold">Capacity: </span>
                  {landfillDetails.landFillCapacity}
                </p>
                <p>
                  <span className="font-bold">Current Total Waste: </span>
                  {landfillDetails.landFillCurrentWaste}
                </p>
                <p>
                  <span className="font-bold">Coordinate: </span>
                  {landfillDetails.landfillLatitude},{" "}
                  {landfillDetails.landFillLongitude}
                </p>
              </div>
            )}

          {user?.roleName === "LAND_MANAGER" &&
            landfillDetails?.landfillId?.toString().length < 1 && (
              <div>
                <div className="font-bold text-2xl my-4">
                  LandFill Not Assigned
                </div>
                Call your admin to assign your Landfill.
              </div>
            )}

          {user?.roleName === "LAND_MANAGER" &&
            rolesWithPermissions.some(
              (role) => role.name === "LAND_MANAGER"
            ) && (
              <div>
                <h1 className="text-xl mb-3">
                  <b>Land Manager Permissions:</b>
                </h1>
                <div className="flex flex-wrap items-center justify-center ">
                  {rolesWithPermissions
                    .find((role) => role.name === "LAND_MANAGER")
                    ?.permissions.map((permission) => (
                      <div
                        key={permission.name}
                        className="border-2 border-slate-400 m-2 p-3 bg-slate-300 rounded-xl"
                      >
                        <div>
                          <strong>{permission.name}:</strong>
                        </div>
                        <div> {permission.description} </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

          {user?.roleName === "SYSTEM_ADMIN" && (
            <div>
              <div className="font-bold text-2xl my-4">Admin</div>
              <div>You are admin</div>
            </div>
          )}
          {user?.roleName !== "STS_MANAGER" &&
            user?.roleName !== "LAND_MANAGER" &&
            user?.roleName !== "SYSTEM_ADMIN" && (
              <div>Wait! Your role has not assigned yet</div>
            )}

          {user?.roleName === "SYSTEM_ADMIN" &&
            rolesWithPermissions.some(
              (role) => role.name === "SYSTEM_ADMIN"
            ) && (
              <div>
                <h1 className="text-xl mb-3">
                  <b>System Admin Permissions:</b>
                </h1>
                <div className="flex flex-wrap items-center justify-center ">
                  {rolesWithPermissions
                    .find((role) => role.name === "SYSTEM_ADMIN")
                    ?.permissions.map((permission) => (
                      <div
                        key={permission.name}
                        className="border-2 border-slate-400 m-2 p-3 bg-slate-300 rounded-xl"
                      >
                        <div>
                          <strong>{permission.name}:</strong>
                        </div>
                        <div> {permission.description} </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

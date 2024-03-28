import { useState } from "react";
import axios from "axios";
import { uri } from "@/data/constant";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { getCookie } from "@/lib/cookieFunctions";

type User = {
  id: string;
  username: string;
  email: string;
  profileName: string;
  roleName: string;
  roleDescription: string;

  stsId: string;
  stsName: string;
  stsWardNumber: string;
  stsCapacity: string;
  stsCurrentTotalWaste: string;
  stsLatitude: string;
  stsLongitude: string;

  landfillId: string;
  landFillName: string;
  landFillCapacity: string;
  landFillCurrentWaste: string;
  landFillLatitude: string;
  landFillLongitude: string;
};

export default function useGetUserProfile() {
  const [user, setUser] = useState<User>(); // Initialize with an empty array of Vehicle objects

  async function getUserDetails() {
    try {
      const res = await axios.get(apiRoutes.vehicle.getAll, {
        headers: { Authorization: `Bearer ${getCookie(jwtToken)}` },
      });
      // Assuming the response data is an array of vehicles
      const UserDetails: User = res.data.map((user: any) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        profileName: user.profileName,
        roleName: user.roleName,
        roleDescription: user.role.description,

        stsId: user.sts.id,
        stsName: user.sts.name,
        stsWardNumber: user.sts.wardNumber,
        stsCapacity: user.sts.capacity,
        stsCurrentTotalWaste: user.sts.currentTotalWaste,
        stsLatitude: user.sts.latitude,
        stsLongitude: user.sts.longitude,

        landfillId: user.landfill.id,
        landFillName: user.landfill.name,
        landFillCapacity: user.landfill.capacity,
        landFillCurrentWaste: user.landfill.currentTotalWaste,
        landfillLatitude: user.landfill.latitude,
        landFillLongitude: user.landfill.longitude,
      }));

      setUser(UserDetails);

      return true;
    } catch (error: any) {
      alert(error.message?.toString() || "Error fetching vehicle list");
      return false;
    }
  }

  return { user, getUserDetails };
}

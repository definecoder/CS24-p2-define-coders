


import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiRoutes } from '@/data/apiRoutes'; // Adjust the import path
import { jwtToken } from '@/data/cookieNames'; // Adjust the import path
import { getCookie } from '@/lib/cookieFunctions'; // Adjust the import path

type User = {
  id: string;
  username: string;
  email: string;
  profileName: string;
   roleName: string;
  roleDescription: string;
 
};

type STSType = {
  stsId: string ;
  stsName: string;
  stsWardNumber: string;
  stsCapacity: string;
  stsCurrentTotalWaste: string;
  stsLatitude: string;
  stsLongitude: string;
}

type LandfillType = {
 landfillId: string | null;
  landFillName: string;
  landFillCapacity: string;
  landFillCurrentWaste: string;
  landfillLatitude: string;
  landFillLongitude: string;
}

export default function useGetUserProfile() {
  const [user, setUser] = useState<User >({
    id: '',
    username: '',
    email: '',
    profileName: '',
     roleName: '',
    roleDescription: '',
  }); // Initialize with undefined
  const [stsDetails, setStsDetails] = useState<STSType >({
    stsId: '',
    stsName: '',
    stsWardNumber: '',
    stsCapacity: '',
    stsCurrentTotalWaste: '',
    stsLatitude: '',
    stsLongitude: '',
  });

  const [landfillDetails, setLandfillDetails] = useState<LandfillType>({
    landfillId: null,
    landFillName: '',
    landFillCapacity: '',
    landFillCurrentWaste: '',
    landfillLatitude: '',
    landFillLongitude: '',
  });

  async function getUserDetails() {
    try {
      const res = await axios.get(apiRoutes.profile.getProfile, {
        headers: { Authorization: `Bearer ${getCookie(jwtToken)}` },
      });

      if (res.data.roleName === "STS_MANAGER") {
        const userDetails: User = {
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
          profileName: res.data.profileName,
            roleName: res.data.roleName,
        roleDescription: res.data.role.description,

       
        };

        const ResStsDetails: STSType = {
           stsId: res.data.sts.id,
        stsName: res.data.sts.name,
        stsWardNumber: res.data.sts.wardNumber,
        stsCapacity: res.data.sts.capacity,
        stsCurrentTotalWaste: res.data.sts.currentTotalWaste,
        stsLatitude: res.data.sts.latitude,
        stsLongitude: res.data.sts.longitude,
        }

        setUser(userDetails);
        setStsDetails(ResStsDetails);
      } else if(res.data.roleName === "LAND_MANAGER") {

        const userDetails: User = {
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
          profileName: res.data.profileName,
            roleName: res.data.roleName,
        roleDescription: res.data.role.description,

       
        };

        const ResLandDetails: LandfillType = {
         
        landfillId: res.data.landfill.id,
        landFillName: res.data.landfill.name,
        landFillCapacity: res.data.landfill.capacity,
        landFillCurrentWaste: res.data.landfill.currentTotalWaste,
        landfillLatitude: res.data.landfill.latitude,
        landFillLongitude: res.data.landfill.longitude,
        };

        setUser(userDetails);
        setLandfillDetails(ResLandDetails);
       
      }else{
        const userDetails: User = {
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
          profileName: res.data.profileName,
            roleName: res.data.roleName,
        roleDescription: res.data.role.description,

       
        };
        setUser(userDetails);

      }



    } catch (error: any) {
      alert(error.message?.toString() || 'Error fetching user profile'); // Updated error message
    }
  }

  useEffect(() => {
    console.log(user);
    console.log(stsDetails);
    console.log(landfillDetails)
  }, [user, stsDetails, landfillDetails]); // Call getUserDetails when the component mounts

  return { user, stsDetails, landfillDetails, getUserDetails };
}

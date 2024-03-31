


import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiRoutes } from '@/data/apiRoutes'; // Adjust the import path
import { jwtToken } from '@/data/cookieNames'; // Adjust the import path
import { getCookie } from '@/lib/cookieFunctions'; // Adjust the import path
import { message } from 'antd';

type User = {
  id: string;
  username: string;
  email: string;
  profileName: string;
   roleName: string;
  roleDescription: string;

  userCreated: string;
  userUpdated: string;

 
};

type STSType = {
  stsId: string ;
  stsName: string;
  stsWardNumber: string;
  stsCapacity: string;
  stsCurrentTotalWaste: string;
  stsLatitude: string;
  stsLongitude: string;

  roleCreated: string;
  roleUpdated: string;
}

type LandfillType = {
 landfillId: string ;
  landFillName: string;
  landFillCapacity: string;
  landFillCurrentWaste: string;
  landfillLatitude: string;
  landFillLongitude: string;

  roleCreated: string;
  roleUpdated: string;
}

export default function useGetUserProfile() {
  const [user, setUser] = useState<User >({
    id: '',
    username: '',
    email: '',
    profileName: '',
     roleName: '',
    roleDescription: '',
    userCreated: '',
    userUpdated: ''
  }); // Initialize with undefined
  const [stsDetails, setStsDetails] = useState<STSType >({
    stsId: '',
    stsName: '',
    stsWardNumber: '',
    stsCapacity: '',
    stsCurrentTotalWaste: '',
    stsLatitude: '',
    stsLongitude: '',
    roleCreated: '',
    roleUpdated: ''
  });

  const [landfillDetails, setLandfillDetails] = useState<LandfillType>({
    landfillId: '',
    landFillName: '',
    landFillCapacity: '',
    landFillCurrentWaste: '',
    landfillLatitude: '',
    landFillLongitude: '',
    roleCreated: '',
    roleUpdated: ''
  });

  async function getUserDetails() {
    try {
      const res = await axios.get(apiRoutes.profile.getProfile, {
        headers: { Authorization: `Bearer ${getCookie(jwtToken)}` },
        
      });
        // console.log(res.data);
      if (res.data.roleName === "STS_MANAGER" ) {
        const userDetails: User = {
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
          profileName: res.data.profileName,
            roleName: res.data.roleName,
        roleDescription: res.data.role.description,

        userCreated: res.data.createdAt,
        userUpdated: res.data.updatedAt


       
        };

        if(res.data.stsId){
          const ResStsDetails: STSType = {
            stsId: res.data.sts.id,
         stsName: res.data.sts.name,
         stsWardNumber: res.data.sts.wardNumber,
         stsCapacity: res.data.sts.capacity,
         stsCurrentTotalWaste: res.data.sts.currentTotalWaste,
         stsLatitude: res.data.sts.latitude,
         stsLongitude: res.data.sts.longitude,

         roleCreated: res.data.role.createdAt,
         roleUpdated: res.data.role.updatedAt
         }
         setStsDetails(ResStsDetails);
        }

        

        setUser(userDetails);
        
      } else if(res.data.roleName === "LAND_MANAGER" ) {

        const userDetails: User = {
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
          profileName: res.data.profileName,
            roleName: res.data.roleName,
        roleDescription: res.data.role.description,

        userCreated: res.data.createdAt,
        userUpdated: res.data.updatedAt
        };

        if(res.data.landfillId){
          const ResLandDetails: LandfillType = {
         
            landfillId: res.data.landfill.id,
            landFillName: res.data.landfill.name,
            landFillCapacity: res.data.landfill.capacity,
            landFillCurrentWaste: res.data.landfill.currentTotalWaste,
            landfillLatitude: res.data.landfill.latitude,
            landFillLongitude: res.data.landfill.longitude,

            roleCreated: res.data.role.createdAt,
            roleUpdated: res.data.role.updatedAt
            };
            setLandfillDetails(ResLandDetails);

        }
        setUser(userDetails);
       
      }else if(res.data.roleName === "SYSTEM_ADMIN" ) {

        const userDetails: User = {
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
          profileName: res.data.profileName,
            roleName: res.data.roleName,
        roleDescription: res.data.role.description,

        userCreated: res.data.createdAt,
        userUpdated: res.data.updatedAt
        };

        
        setUser(userDetails);
       
      }else{
        const userDetails: User = {
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
          profileName: res.data.profileName,
            roleName: res.data.roleName,
        roleDescription: res.data.role.description,

        userCreated: res.data.createdAt,
        userUpdated: res.data.updatedAt
        };
        setUser(userDetails);

      }



    } catch (error: any) {
      message.error(error?.response?.data?.message?.toString() || 'Error fetching user profile'); // Updated error message
    }
  }

  // useEffect(() => {
  //   console.log(user);
  //   console.log(stsDetails);
  //   console.log(landfillDetails)
  // }, [user, stsDetails, landfillDetails]); // Call getUserDetails when the component mounts

  return { user, stsDetails, landfillDetails, getUserDetails };
}

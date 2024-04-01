import { useState } from 'react';
import { setCookie, getCookie } from '@/lib/cookieFunctions';
import axios from 'axios';
import { jwtToken, stsId } from '@/data/cookieNames'; // Ensure these variables are properly defined
import { apiRoutes } from '@/data/apiRoutes';
import { message } from 'antd';

export default function useLandFillStorageEdit() {
  async function UpdateLandfillStorage(data: {
    storedData: number;
    landfillId: string; 
  }) {
    

    try {
      const editedProfile = {
        currentTotalWaste: data.storedData,
       
      };
      console.log(data.storedData);


      const res = await axios.put(
        apiRoutes.landfill.edit + data.landfillId,
        editedProfile,
        {
          headers: { Authorization: `Bearer ${getCookie(jwtToken)}` },
        }
      );

   
      window.location.reload();
      return "Wastage Released From Landfill";
    } catch (error: any) {
      message.error(error?.response?.data.message?.toString() || 'Error Editing');
      return null;
    }
  }

  return { UpdateLandfillStorage };
}

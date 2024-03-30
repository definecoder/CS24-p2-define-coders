import { useState } from 'react';
import { setCookie, getCookie } from '@/lib/cookieFunctions';
import axios from 'axios';
import { jwtToken, stsId } from '@/data/cookieNames'; // Ensure these variables are properly defined
import { apiRoutes } from '@/data/apiRoutes';

export default function useUpdateSts() {
  async function UpdateSts(data: {
    storedData: number;
    stsId: string; 
  }) {
    

    try {
      const editedProfile = {
        currentTotalWaste: data.storedData,
       
      };
     // console.log("hettt");
     // console.log(data.storedData);


      const res = await axios.put(
        apiRoutes.sts.edit + data.stsId,
        editedProfile,
        {
          headers: { Authorization: `Bearer ${getCookie(jwtToken)}` },
        }
      );

   
      window.location.reload();
      return "Wastege Entry in STS Successful";
    } catch (error: any) {
      alert(error.message?.toString() || 'Error Editing');
      return false;
    }
  }

  return { UpdateSts };
}

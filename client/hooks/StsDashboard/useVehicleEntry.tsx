import { useState } from 'react';
import {admin, landfillManager, stsManager, unassigned} from '@/data/roles';
import { setCookie, getCookie } from '@/lib/cookieFunctions';
import axios from 'axios';
import { jwtToken, role , uid , username, stsId} from '@/data/cookieNames';
import { uri } from '@/data/constant';

export default function useVehicleEntry() {  

  const [entryTime, setEntryTime] = useState(new Date().toLocaleString());
  const [vehicleId, setVehicleId] = useState("");
  
  async function VehicleEntry() {
    const userStsId = getCookie(stsId);
    
    try {
      const res = await axios.post('http://localhost:8585/sts-entry/create', {
        stsId : userStsId,
        vehicleId: vehicleId,
        entryTime: entryTime
    });
    //use the response from here

      return true;
    } catch (error: any) {
      alert(error.message?.toString() || "error logging in");
      return false;
    }
    
  }

  return {entryTime, setEntryTime,vehicleId, setVehicleId, VehicleEntry};
}
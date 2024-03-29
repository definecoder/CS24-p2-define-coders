import { useState } from 'react';
import {admin, landfillManager, stsManager, unassigned} from '@/data/roles';
import { setCookie, getCookie } from '@/lib/cookieFunctions';
import axios from 'axios';
import { jwtToken, role , uid , username, stsId} from '@/data/cookieNames';
import { uri } from '@/data/constant';

export default function useVehicleEntry() {  

  const [entryTime, setEntryTime] = useState(new Date().toLocaleString());
  const [vehicleId, setVehicleId] = useState("Default");
  
  async function VehicleEntry(data: { vehicleIds: string | undefined; entryTimes: string }) {
    const userStsId = getCookie(stsId);
    // console.log(stsId);
     console.log(data.vehicleIds);
     console.log(data.entryTimes);
    
    try {
      const isoString = new Date(data.entryTimes).toISOString();
      const res = await axios.post('http://localhost:8585/sts-entry/create', {
        stsId : "sts1",
        vehicleId: data.vehicleIds,
        entryTime: isoString
    });
    //use the response from here
    //console.log(res.data);
    window.location.reload();
      return "Vehicle Entered Noted";
    } catch (error: any) {
      alert(error.message?.toString() || "error logging in");
      return false;
    }
    
  }

  return {entryTime, setEntryTime,vehicleId, setVehicleId, VehicleEntry};
}
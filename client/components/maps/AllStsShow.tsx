"use client";

import useGetAllSTS from "@/hooks/stsdata/useGetAllSTS";
import GoogleMapComponent from '@/components/maps/GoogleMap'
import * as React from "react";
type StsShow = {
   
    latitude: string,
    longitude: string,
    storagePercentage: string
    
};

export const StsVehicleEntryModal = () => {
    const { getAllSTS, stsCoordinate  } = useGetAllSTS();

    const [stsData, setStsData] = React.useState<StsShow[]>([]);
    
   
  
  
    React.useEffect(() => {
        getAllSTS();
    }, []);
  
    React.useEffect(() => {
      setStsData(stsCoordinate);
    }, [stsCoordinate]);
    

  return (
    <div>
        {/* <GoogleMapComponent coordinates={coordinates} dumpFills={dumpFills}></GoogleMapComponent> */}
    </div>
  );
};

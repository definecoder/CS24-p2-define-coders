import { ChakraProvider, theme } from "@chakra-ui/react";
import OptimizedRouteMap from "@/components/maps/OptimizedRoute";
import RouteMap from "@/components/maps/RouteMap";
import STSVehicleList from "@/components/dataTables/StsVehicleList";

import useGetAllSTS from "@/hooks/stsdata/useGetAllSTS";
import * as React from "react";
import { useState, useEffect } from "react";
import useGetAllLandfill from "@/hooks/dataQuery/useGetAllLandfill";

type StsRouteType = {
  coordinate: string;
  name: string;
};

export default function GetStsCoordinateForRoute() {
  const { stsList, getAllSTS, stsRoute } = useGetAllSTS();
  const [coordinates, setCoordinates] = useState<string[]>([]);
  const [stsName, setStsName] = useState<string[]>([]);
  const [stsRouting, setStsRouting] = useState<StsRouteType[]>([]);
  const [landFIllRouting, setLandFIllRouting] = useState<StsRouteType[]>([]);
  const { fetchAllLandfills, landFillData } = useGetAllLandfill();

  useEffect(() => {
    getAllSTS();  
    fetchAllLandfills();
  }, []);

  useEffect(() => {
    const coordinateArray: string[] = stsRoute.map((route) => route.coordinate);
    setCoordinates(coordinateArray);
    setStsRouting(stsRoute);
    console.log(coordinateArray);
    console.log(stsRoute);
  }, [stsRoute]);

  useEffect(() => {
    const landfilllist: StsRouteType[] = landFillData.map((route) => {
      return {
        coordinate: route.latitude + ", " + route.longitude,
        name: route.name,      
      };
    });
    setLandFIllRouting(landfilllist);
    console.log(landfilllist);
  }, [landFillData]);

  return (
    <ChakraProvider theme={theme}>
      <OptimizedRouteMap coordinates={stsRouting} landFillCoordinates={landFIllRouting} />
    </ChakraProvider>
  );
}

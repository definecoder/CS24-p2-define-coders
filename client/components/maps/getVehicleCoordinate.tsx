
import { ChakraProvider, theme } from "@chakra-ui/react";
import OptimizedRouteMap from "@/components/maps/OptimizedRoute";
import RouteMap from "@/components/maps/RouteMap";
import STSVehicleList from "@/components/dataTables/StsVehicleList";

import useGetAllSTS from "@/hooks/stsdata/useGetAllSTS";
import * as React from "react";
import {useState, useEffect} from "react";
import useGetSTSAvailableVehicles from "@/hooks/vehicles/useSTSAvailableVehicles";
import OptimizedVehicleRoute from "./OptimizedVehicleRoute";



type StsRouteType = {
  coordinate: string,
  name: string,
}

type VehicleCoordinateType = {
    vehicleNumber: string;
    vehicleType: string;
    capacity: string;
    coordinate: string;
  };

export default function GetVehicleCoordinateRoute() {
    const {stsList, getAllSTS, stsRoute  } = useGetAllSTS();
    const {vehicleList,vehicleRoute, vehicleNumberList, GetSTSAvailableVehicles  } = useGetSTSAvailableVehicles();
    const [coordinates, setCoordinates] = useState<string[]>([]);
    const [stsName, setStsName] = useState<string[]>([]);
    const [stsRouting , setStsRouting] = useState<StsRouteType[]>([]);
    const [vehicleRouting , setVehicleRouting] = useState<VehicleCoordinateType[]>([]);
    
    


      useEffect(() => {
        GetSTSAvailableVehicles();
        getAllSTS();
console.log(stsRoute);

        
    }, []);

    useEffect(() => {
      const coordinateArray: string[] = stsRoute.map(route => route.coordinate);
      setCoordinates(coordinateArray);
      setStsRouting(stsRoute);
      setVehicleRouting(vehicleRoute);
  }, [stsRoute, vehicleRoute]);

 
  return (
              <ChakraProvider theme={theme}>
                <OptimizedVehicleRoute coordinates={stsRouting} vehicleCoord={vehicleRouting}/>
              </ChakraProvider>
  );
}

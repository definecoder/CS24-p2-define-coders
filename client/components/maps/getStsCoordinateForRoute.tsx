
import { ChakraProvider, theme } from "@chakra-ui/react";
import OptimizedRouteMap from "@/components/maps/OptimizedRoute";
import RouteMap from "@/components/maps/RouteMap";
import STSVehicleList from "@/components/dataTables/StsVehicleList";

import useGetAllSTS from "@/hooks/stsdata/useGetAllSTS";
import * as React from "react";
import {useState, useEffect} from "react";



type StsRouteType = {
  coordinate: string,
  name: string,
}

export default function GetStsCoordinateForRoute() {
    const {stsList, getAllSTS, stsRoute  } = useGetAllSTS();
    const [coordinates, setCoordinates] = useState<string[]>([]);
    const [stsName, setStsName] = useState<string[]>([]);
    const [stsRouting , setStsRouting] = useState<StsRouteType[]>([]);
    
    

    const suggestionsList: string[] = [
        "23.7751927, 90.3810282",
        "Bolbacchan STS",
        "Gulshan STS",
        "Baridhara STS",
        "Mohammadpur STS",
        "Gulistan STS",
        "Rampura STS",
      ];
    
      const landfillList: string[] = ["23.7618195, 90.3833253","Amin Bazar", "Chashara"];

    

      useEffect(() => {
        getAllSTS();
console.log(stsRoute);

        
    }, []);
    useEffect(() => {
      const coordinateArray: string[] = stsRoute.map(route => route.coordinate);
      setCoordinates(coordinateArray);
      setStsRouting(stsRoute);
  }, [stsRoute]);
      

   
        console.log(coordinates);
  return (
              <ChakraProvider theme={theme}>
                <OptimizedRouteMap coordinates={stsRouting}/>
              </ChakraProvider>
  );
}

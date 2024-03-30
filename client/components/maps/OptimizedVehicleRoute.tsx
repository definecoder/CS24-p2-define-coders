"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { ChevronDownIcon } from "@chakra-ui/icons";

const center = { lat: 23.77217046, lng: 90.39943882 };

type StsRouteType = {
  coordinate: string;
  name: string;
};

type VehicleCoordinateType = {
    vehicleNumber: string;
    vehicleType: string;
    capacity: string;
    coordinate: string;
  };

type MapProps = {
  coordinates: StsRouteType[];
  vehicleCoord: VehicleCoordinateType[];
};

interface Coordinate {
    lat: number;
    lng: number;
}

const OptimizedVehicleRoute: React.FC<MapProps> = ({ coordinates, vehicleCoord }) => {
  const [routeType, setRouteType] = useState<string>(
    "Vehicle Tracking Map"
  );
  const [useDropdown, setUseDropdown] = useState<boolean>(false);
  const [useLandDropdown, setUseLandDropdown] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const [landTerm, setLandterm] = useState<string>("");
  const [showLandSuggestion, setShowLandsuggestion] = useState<boolean>(false);

  //coordinate data stuffs
  const [allCoordinates, setAllCoordinates] = useState<string[]>([]);
  const [landFilCoord, setLandFillCoord] = useState<StsRouteType>({
    coordinate: "23.7244018, 90.3887196",
    name: "Amin Bazar",
  });

  const [vehicleAllCoord, setVehicleAllCoord] = useState<string[]>([]);
  const [vehicleObjectCoord, setVehicleObjectCoord] = useState<string[]>([]);

  const suggestionsList: string[] = [
    "23.7751927, 90.3810282",
    "Dhanmondi STS",
    "Gulshan STS",
    "Baridhara STS",
    "Mohammadpur STS",
    "Gulistan STS",
    "Rampura STS",
  ];

  useEffect(() => {
    const coordinateArray: string[] = coordinates.map((route) => route.name);
    const VehicleCoordinateArray: string[] = vehicleCoord.map((route) => route.vehicleNumber);
    const VehicleCoordinateObject: string[] = vehicleCoord.map((route) => route.coordinate);
    setAllCoordinates(coordinateArray);
    setVehicleAllCoord(VehicleCoordinateArray);
    setVehicleObjectCoord(VehicleCoordinateObject);
  }, [coordinates]);

  const landfillList: string[] = ["Amin Bazar"];

  //input studds

  const handleChangeInputType = () => {
    setUseDropdown((prev) => !prev);
  };
  const handleLandChangeInputType = () => {
    setUseLandDropdown((prev) => !prev);
  };

  const handleChangeRouteType = () => {
    setRouteType((prevType) =>
      prevType === "STS to Landfill Optimal Route"
        ? "STS to Landfill Optimal Route"
        : "STS to Landfill Optimal Route"
    );
    handleChangeInputType();
    handleLandChangeInputType();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setShowSuggestions(true);
  };
  const handleLandInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLandterm(event.target.value);
    setShowLandsuggestion(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  const handleLandSuggestionClick = (suggestion: string) => {
    setLandterm(suggestion);
    setShowLandsuggestion(false);
  };

  const filteredSuggestions = allCoordinates.filter((suggestion) =>
    suggestion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const landFilteredSuggestions = vehicleAllCoord.filter((suggestion) =>
    suggestion.toLowerCase().includes(landTerm.toLowerCase())
  );

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState<string>("");
  const [duration, setDuration] = useState<string>("");

  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  const stsRef = useRef<HTMLInputElement>(null);
  const landfillRef = useRef<HTMLInputElement>(null);

  if (!isLoaded) {
    return <SkeletonText />;
  }

  const getSTSCoodrdinateByName = (stsName: string): string => {
    const vehicle = coordinates.find((sts) => sts.name === stsName);
    if (vehicle) {
      return vehicle.coordinate.toString();
    }

    // If vehicle is not found, return undefined
    return "no vehicle";
  };

  const getVehicleCoordByName = (stsName: string): string => {
    const vehicle = vehicleCoord.find((sts) => sts.vehicleNumber === stsName);
    if (vehicle) {
      return vehicle.coordinate.toString();
    }

    // If vehicle is not found, return undefined
    return "no vehicle";
  };

  async function calculateRoute() {
   
      const stsCoord = getSTSCoodrdinateByName(searchTerm);
      const vehicleCoord = getVehicleCoordByName(landTerm);

      const newString = stsCoord.substring(0, 11);
      console.log(stsCoord);
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: vehicleCoord,
        destination: stsCoord,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      if (results && results.routes.length > 0) {
        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance?.text || "");
        setDuration(results.routes[0].legs[0].duration?.text || "");
      }
    
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    setSearchTerm("");
    setLandterm("");
    if (originRef.current) originRef.current.value = "";
    if (destinationRef.current) destinationRef.current.value = "";
  }

//   const DummyCoordinates = [
//     { lat: 23.76287175, lng: 90.4306625 },
//     { lat: 23.79067691, lng: 90.3932404 },
//     { lat: 23.75847265, lng: 90.3819107 },
//     { lat: 23.79868747, lng: 90.3870606 },
//     { lat: 23.79083399, lng: 90.3762459 },
//     { lat: 23.79366130, lng: 90.4129814 },
//     { lat: 23.77952415, lng: 90.4260277 }
//   ];

const ObjectCoordinates: Coordinate[] = vehicleObjectCoord.map(coordString => {
    const [lat, lng] = coordString.split(',').map(parseFloat);
    return { lat, lng };
});
  const carIcon = {
    url: 'https://banner2.cleanpng.com/20180331/tsw/kisspng-pickup-truck-car-dump-truck-clip-art-dump-truck-5abfc5a5931d73.2100081815225174136026.jpg',
    scaledSize: new window.google.maps.Size(40, 40), // Adjust the size as per your icon
  };
  console.log(ObjectCoordinates);

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100%"
      w="100%"
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        <GoogleMap
          center={center}
          zoom={12}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map as google.maps.Map)}
        >
          {map && ObjectCoordinates.map(coord => (
        <Marker key={`${coord.lat}-${coord.lng}`} position={coord} icon={carIcon}/>
      ))}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        w="100%"
        zIndex="1"
      >
        <div>
          <b>Vehicle Live Tracking</b>
        </div>
        <HStack spacing={2} justifyContent="space-between">
        <Box flexGrow={1}>
           
           <div>
             <input
               type="text"
               placeholder="Search by Vehicle"
               value={landTerm}
               onChange={handleLandInputChange}
               className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
             />
             {showLandSuggestion && (
               <ul className="absolute z-10 mt-1 w-2/5 bg-white rounded-md shadow-lg">
                 {landFilteredSuggestions.map((suggestion, index) => (
                   <li
                     key={index}
                     onClick={() => handleLandSuggestionClick(suggestion)}
                   >
                     {suggestion}
                   </li>
                 ))}
               </ul>
             )}
           </div>
      
       </Box>
          <Box flexGrow={1}>
           
              <div>
                <input
                  type="text"
                  placeholder="Search by STS"
                  value={searchTerm}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-1 py-2 rounded-md focus:outline-none focus:border-blue-500"
                />
                {showSuggestions && (
                  <ul className="absolute z-10 mt-1 w-2/5 bg-white rounded-md shadow-lg">
                    {filteredSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
          
          </Box>
         

          <ButtonGroup>
            <Button
              colorScheme="facebook"
              type="submit"
              onClick={calculateRoute}
            >
              Calculate Route
            </Button>
            <IconButton
              aria-label="Clear Route"
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label="Center Back"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              if (map) {
                map.panTo(center);
                map.setZoom(15);
              }
            }}
          />
        </HStack>
      </Box>
    </Flex>
  );
};

export default OptimizedVehicleRoute;

// const carStringCoordinate = [
//     "23.762871759048853, 90.43066259648545",
//     "23.790676919006554, 90.39324041749616",
//     "23.758472658178363, 90.38191076697645",
//     "23.798687471768236, 90.38706060812177",
//     "23.790833993414953, 90.37624594171659",
//     "23.793661300302535, 90.41298147521984",
//     "23.779524150835503, 90.42602773945464",
    
//     ]
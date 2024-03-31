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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { set } from "react-hook-form";
import { Crosshair } from "lucide-react";

const center = { lat: 23.7244018, lng: 90.3887196 };

type StsRouteType = {
  coordinate: string;
  name: string;
};

type MapProps = {
  coordinates: StsRouteType[];
  landFillCoordinates: StsRouteType[];
};

const OptimizedRouteMap: React.FC<MapProps> = ({
  coordinates,
  landFillCoordinates,
}) => {
  const [routeType, setRouteType] = useState<string>(
    "STS TO LANDFILL OPTIMAL ROUTE"
  );
  const [useDropdown, setUseDropdown] = useState<boolean>(true);
  const [useLandDropdown, setUseLandDropdown] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const [landTerm, setLandterm] = useState<string>("");
  const [showLandSuggestion, setShowLandsuggestion] = useState<boolean>(false);

  //coordinate data stuffs
  const [allCoordinates, setAllCoordinates] = useState<string[]>([]);
  const [landFilCoords, setLandFillCoords] = useState<StsRouteType[]>([]);

  const [landfillList, setLandfillList] = useState<string[]>([]);

  useEffect(() => {
    const coordinateArray: string[] = coordinates.map((route) => route.name);
    setAllCoordinates(coordinateArray);
  }, [coordinates]);

  useEffect(() => {
    //const coordinateArray: string[] = coordinates.map((route) => route.coordinate);
    setLandFillCoords(landFillCoordinates);
    setLandfillList(landFillCoordinates.map((route) => route.name));
    console.log(landfillList);
  }, [landFillCoordinates]);

  //input studds

  const handleChangeInputType = () => {
    setUseDropdown((prev) => !prev);
  };
  const handleLandChangeInputType = () => {
    setUseLandDropdown((prev) => !prev);
  };

  const handleChangeRouteType = () => {
    setRouteType((prevType) =>
      prevType === "LOCATION BASED OPTIMAL ROUTE"
        ? "STS TO LANDFILL OPTIMAL ROUTE"
        : "LOCATION BASED OPTIMAL ROUTE"
    );
    handleChangeInputType();
    handleLandChangeInputType();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // setShowSuggestions(true);
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

  const landFilteredSuggestions = landfillList.filter((suggestion) =>
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

  async function calculateRoute() {
    if (routeType === "Location Based Optimal Route") {
      if (
        !originRef.current ||
        !destinationRef.current ||
        originRef.current.value === "" ||
        destinationRef.current.value === ""
      ) {
        return;
      }

      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      if (results && results.routes.length > 0) {
        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance?.text || "");
        setDuration(results.routes[0].legs[0].duration?.text || "");
      }
    } else {
      const stsCoord = getSTSCoodrdinateByName(coordinates[parseInt(searchTerm)].name);
      const newString = stsCoord.substring(0, 11);
      //console.log(stsCoord);
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: stsCoord,
        destination:
          landFilCoords.find((landfill) => landfill.name === landfillList[parseInt(landTerm)])
            ?.coordinate || "",
        travelMode: google.maps.TravelMode.DRIVING,
      });

      if (results && results.routes.length > 0) {
        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance?.text || "");
        setDuration(results.routes[0].legs[0].duration?.text || "");
      }
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
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map as google.maps.Map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius={10}
        m={-1}
        bgColor="#f1f8ff"
        shadow="base"
        w="100%"
        zIndex="1"
      >
        <div className="pb-3 text-center text-lg">
          <b>{routeType}</b>
          {/* <Button
            colorScheme="teal"
            variant="ghost"
            onClick={handleChangeRouteType}
          >
            Change
          </Button> */}
        </div>
        <div className="grid grid-flow-row grid-cols-3 gap-2">
          <Select value={searchTerm} onValueChange={(e) => setSearchTerm(e)}>
            <SelectTrigger>
              <SelectValue id="STS" placeholder="STS Name" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>STS</SelectLabel>
                {coordinates.map((coordinate, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {coordinate.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={landTerm} onValueChange={(e) => setLandterm(e)}>
            <SelectTrigger>
              <SelectValue id="Landfill" placeholder="Landfill Name" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Landfill</SelectLabel>
                {landfillList.map((landfill, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {landfill}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <ButtonGroup className="flex justify-center">
            <Button
              colorScheme="facebook"
              type="submit"
              onClick={calculateRoute}
            >
              <div className="text-sm">Calculate</div>
            </Button>
            <IconButton
              aria-label="Clear Route"
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </div>

        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>
            <b>Distance:</b> {distance}{" "}
          </Text>
          <Text>
            <b>Duration:</b> {duration}{" "}
          </Text>
          <IconButton
            aria-label="Center Back"
            title="Go to center"
            icon={<Crosshair size={20} />}
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

export default OptimizedRouteMap;

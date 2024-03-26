"use client";

import React, { useRef, useState } from 'react';
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
  Menu, MenuButton, MenuItem, MenuList
} from '@chakra-ui/react';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import {
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  useJsApiLoader,
} from '@react-google-maps/api';
import { ChevronDownIcon } from '@chakra-ui/icons'

const center = { lat: 23.7244018, lng: 90.38871960 };

function OptimizedRouteMap() {
    const [routeType, setRouteType] = useState<string>('Location Based Optimal Route');
  const [useDropdown, setUseDropdown] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const suggestionsList: string[] = [
    'Badda STS',
    'Dhanmondi STS',
    'Gulshan STS',
    'Baridhara STS',
    'Mohammadpur STS',
    'Gulistan STS',
    'Rampura STS',
    
   
  ];

  const landfillList: string[] = [
    'Amin Bazar',
    'Chashara',
  ];

  const handleChangeInputType = () => {
    setUseDropdown(prev => !prev);
  };

  const handleChangeRouteType = () => {
    setRouteType(prevType => prevType === 'Location Based Optimal Route' ? 'STS Based Optimal Route' : 'Location Based Optimal Route');
    handleChangeInputType();
};

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  const filteredSuggestions = suggestionsList.filter(suggestion =>
    suggestion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState<string>('');
  const [duration, setDuration] = useState<string>('');

  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  if (!isLoaded) {
    return <SkeletonText />;
  }

  async function calculateRoute() {
    if (!originRef.current || !destinationRef.current || originRef.current.value === '' || destinationRef.current.value === '') {
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
      setDistance(results.routes[0].legs[0].distance?.text || '');
      setDuration(results.routes[0].legs[0].duration?.text || '');
    }
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    if (originRef.current) originRef.current.value = '';
    if (destinationRef.current) destinationRef.current.value = '';
  }

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100%'
      w='100%'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map as google.maps.Map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        w='100%'
        zIndex='1'
      >
        <div><b>{routeType}</b>
        <Button colorScheme='teal' variant='ghost' onClick={handleChangeRouteType}>
        Change
      </Button>   
        </div>
        <HStack spacing={2} justifyContent='space-between'>
          <Box flexGrow={1}>
          {useDropdown ? (
            <div>
            <input
              type="text"
              placeholder="Search by STS"
              value={searchTerm}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            />
            {showSuggestions && (
              <ul className="absolute z-10 mt-1 w-2/5 bg-white rounded-md shadow-lg">
                {filteredSuggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          ) : (
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          )}
          </Box>
          <Box flexGrow={1}>
          {useDropdown ? (
            <div>
            <input
              type="text"
              placeholder="Search by Landfill"
              value={searchTerm}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            />
            {showSuggestions && (
              <ul className="absolute z-10 mt-1 w-2/5 bg-white rounded-md shadow-lg">
                {filteredSuggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          ) : (
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          )}
          </Box>

          <ButtonGroup>
            <Button colorScheme='facebook' type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label='Clear Route'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label='Center Back'
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
}

export default OptimizedRouteMap;

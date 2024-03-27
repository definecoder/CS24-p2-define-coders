import React, { useState, useEffect } from "react";

interface CoordinateProps {
    vehicleOriginLatitude: string;
    vehicleOriginLongitude: string;
    vehicleDestinationLatitude: string;
    vehicleDestinationLongitude: string;
    distance: string;
    duration: string;
    setDistance: React.Dispatch<React.SetStateAction<string>>;
    setDuration: React.Dispatch<React.SetStateAction<string>>;
  }

  const VehicleReleaseRoute: React.FC<CoordinateProps> = ({ 
    vehicleOriginLatitude,
    vehicleOriginLongitude,
    vehicleDestinationLatitude,
    vehicleDestinationLongitude,
    setDistance,
    setDuration,
    distance,
    duration
   }) => {
 

  useEffect(() => {
    calculateRoute();
  }, []);

  async function calculateRoute() {
    const VehicleOrigin = `${vehicleOriginLatitude} , ${vehicleOriginLongitude}`;
    const VehicleDestination = `${vehicleDestinationLatitude} , ${vehicleDestinationLongitude}`;
    console.log(VehicleOrigin);
    console.log(VehicleDestination);
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: VehicleOrigin,
      destination: VehicleDestination,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    if (results && results.routes.length > 0) {
      setDistance(results.routes[0].legs[0].distance?.text || "");
      setDuration(results.routes[0].legs[0].duration?.text || "");
    }
  }

  return (
    <div>
      <p><b>Distance: </b> {distance}</p>
      <p><b> Duration: </b> {duration}</p>
    </div>
  );
}

export default VehicleReleaseRoute;

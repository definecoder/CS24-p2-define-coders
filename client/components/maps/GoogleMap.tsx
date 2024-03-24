"use client";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MapProps {
  apiKey: string;
}

const MapContainerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: 23.7244018, // Default to New York City
  lng: 90.38871960,
};

const GoogleMapComponent = () => {
    const apiKey= process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={MapContainerStyle}
        center={defaultCenter}
        zoom={16}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;

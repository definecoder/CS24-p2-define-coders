"use client";
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, Circle, InfoWindow } from '@react-google-maps/api';

const MapContainerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: 23.7244018, 
  lng: 90.38871960,
};

interface Coordinate {
  lat: number;
  lng: number;
}

interface MapProps {
  coordinates: Coordinate[];
  dumpFills: number[];
}

const GoogleMapComponent: React.FC<MapProps> = ({ coordinates, dumpFills }) => {
  const [hoveredCircle, setHoveredCircle] = useState<number | null>(null);
  const apiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  const radius= 2000;

  const handleCircleHover = (index: number) => {
    setHoveredCircle(index);
  };

  const handleCircleMouseOut = () => {
    setHoveredCircle(null);
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={MapContainerStyle}
        center={defaultCenter}
        zoom={12}
      >
        <Marker position={defaultCenter} />
        {coordinates.map((coordinate, index) => {
          let circleColor = '#00FF00'; // Default to green

          if (dumpFills[index] >= 40 && dumpFills[index] <= 80) {
            circleColor = '#FFFF00'; // Yellow
          } else if (dumpFills[index] > 80) {
            circleColor = '#FF0000'; // Red
          }

          return (
            <Circle
              key={index}
              center={coordinate}
              radius={radius}
              onMouseOver={() => handleCircleHover(index)}
              onMouseOut={handleCircleMouseOut}
              options={{
                fillColor: circleColor,
                fillOpacity: 0.35,
                strokeColor: circleColor,
                strokeOpacity: 0.8,
                strokeWeight: 2,
              }}
            />
          );
        })}
        {hoveredCircle !== null && (
          <InfoWindow position={coordinates[hoveredCircle]}>
            <div>
              Data: {dumpFills[hoveredCircle]}%
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;

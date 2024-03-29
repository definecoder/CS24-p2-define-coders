"use client";
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, Circle, InfoWindow } from '@react-google-maps/api';
import { threshold } from '@/hooks/functions/threshold';
import { Button } from '../ui/button';

const MapContainerStyle = {
  width: '100%',
  height: 'calc(100% - 44px)',
  borderRadius: '12px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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
    <>
    <div className='flex justify-between mb-2 mr-2 hover:p'>
      <h1 className='text-xl font-bold'> STS DUMP LOAD HEATMAP </h1>
      <Button onClick={() => {window.location.reload()}}>Refresh</Button>
      </div>    
    <LoadScript googleMapsApiKey={apiKey}>      
      <GoogleMap
        id="maps"
        mapContainerStyle={MapContainerStyle}
        center={defaultCenter}
        zoom={12}
      >
        <Marker position={defaultCenter} />
        {coordinates.map((coordinate, index) => {
          // let circleColor = '#00FF00'; // Default to green

          // if (dumpFills[index] >= 40 && dumpFills[index] <= 80) {
          //   circleColor = '#FFFF00'; // Yellow
          // } else if (dumpFills[index] > 80) {
          //   circleColor = '#FF0000'; // Red
          // }
          let circleColor = threshold(dumpFills[index]);


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
              Trash: {dumpFills[hoveredCircle]}%
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
    </>
  );
};

export default GoogleMapComponent;

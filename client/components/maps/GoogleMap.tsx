"use client";
import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Circle,
  InfoWindow,
} from "@react-google-maps/api";
import { threshold } from "@/hooks/functions/threshold";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { RefreshCcw } from "lucide-react";

const MapContainerStyle = {
  width: "100%",
  height: "calc(100% - 44px)",
  minHeight: "400px",
  borderRadius: "12px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const defaultCenter = {
  lat: 23.7244018,
  lng: 90.3887196,
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
  const apiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const radius = 2000;

  const handleCircleHover = (index: number) => {
    setHoveredCircle(index);
  };

  const handleCircleMouseOut = () => {
    setHoveredCircle(null);
  };

  return (
    <>
      <div className="flex justify-between mb-2 mr-2 hover:p">
        <h1 className="text-xl font-bold"> STS DUMP LOAD HEATMAP </h1>
        <Button
          className={`flex items-center justify-center hover:bg-slate-700 hover:scale-110 text-white bg-[#1A4D2E] rounded-md px-3 py-1`}
          onClick={() => {
            window.location.reload();
          }}
        >
          <RefreshCcw className="p-1 mr-2" />
          Refresh
        </Button>
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
              <div>Trash: {dumpFills[hoveredCircle]}%</div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default GoogleMapComponent;

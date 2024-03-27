// pages/index.tsx

import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface CoordinateProps {
  setLatitude: React.Dispatch<React.SetStateAction<string>>;
  setLongitude: React.Dispatch<React.SetStateAction<string>>;
}

const SetZone: React.FC<CoordinateProps> = ({ setLatitude, setLongitude }) => {
  const locationInputRef = useRef<HTMLInputElement>(null);
  const latInputRef = useRef<HTMLInputElement>(null);
  const longInputRef = useRef<HTMLInputElement>(null);
  const placeNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadScript = (url: string, callback: () => void) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
      script.onload = callback;
      document.head.appendChild(script);
    };
    const apiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

    loadScript(
      "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
      () => {
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`,
          initializeAutocomplete
        );
      }
    );
  }, []);

  const initializeAutocomplete = () => {
    const autocomplete = new google.maps.places.Autocomplete(
      locationInputRef.current!,
      {
        types: ["geocode"],
      }
    );

    google.maps.event.addListener(autocomplete, "place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }
      const lat = place.geometry.location?.lat();
      const lng = place.geometry.location?.lng();
      latInputRef.current!.value = lat?.toString() || "";
      longInputRef.current!.value = lng?.toString() || "";
      // placeNameRef.current!.value = place.name.toString();
      setLatitude(latInputRef.current!.value);
      setLongitude(longInputRef.current!.value);
    });
  };
  const handleLatitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLatitude(event.target.value);
  };

  const handleLongitudeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLongitude(event.target.value);
  };

  return (
    <>
      <Label htmlFor="location" className="text-right">
        STS Location
      </Label>
      <Input
        type="text"
        id="location"
        ref={locationInputRef}
        className="col-span-3"
      />
      <Label htmlFor="location" className="text-right">
        STS Location
      </Label>
      <div className="flex gap-2 col-span-3">
        <Input
          type="text"
          placeholder="Latitude"
          id="lat"
          ref={latInputRef}
          onChange={handleLatitudeChange}
          className=""
        />
        <Input
          type="text"
          id="long"
          placeholder="Longitude"
          ref={longInputRef}
          onChange={handleLongitudeChange}
        />
      </div>
      {/* <input type="text" id="placeName" ref={placeNameRef} readOnly />  */}
    </>
  );
};

export default SetZone;

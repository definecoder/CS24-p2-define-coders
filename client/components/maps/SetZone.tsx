// pages/index.tsx

import { useEffect, useRef, useState } from 'react';

const Home = () => {
    const locationInputRef = useRef<HTMLInputElement>(null);
    const latInputRef = useRef<HTMLInputElement>(null);
    const longInputRef = useRef<HTMLInputElement>(null);
    const placeNameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const loadScript = (url: string, callback: () => void) => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            script.onload = callback;
            document.head.appendChild(script);
        };
        const apiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

        loadScript('https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js', () => {
            loadScript(
                `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`,
                initializeAutocomplete
            );
        });
    }, []);

    const initializeAutocomplete = () => {
        const autocomplete = new google.maps.places.Autocomplete(locationInputRef.current!, {
            types: ['geocode']
        });

        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            const place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            latInputRef.current!.value = lat.toString();
            longInputRef.current!.value = lng.toString();
            placeNameRef.current!.value = place.name.toString();
        });
    };

    return (
        <div>
            <input type="text" id="location" ref={locationInputRef} />
            <input type="text" id="lat" ref={latInputRef} readOnly />
            <input type="text" id="long" ref={longInputRef} readOnly />
            <input type="text" id="placeName" ref={placeNameRef} readOnly /> 
        </div>
    );
};

export default Home;

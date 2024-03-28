import useGetAllSTS from "@/hooks/stsdata/useGetAllSTS";
import GoogleMapComponent from "@/components/maps/GoogleMap";
import * as React from "react";

type StsShow = {
    lat: number;
    lng: number;
    // storagePercentage: number
};

export const AllStsMapShow = () => {
    const { getAllSTS, stsCoordinate, storagePercentage } = useGetAllSTS();

    const staticCoordinates: StsShow[] = [
        { lat: 23.7031879, lng: 90.35564201 },
        { lat: 23.6856870, lng: 90.44630134 },
        { lat: 23.6843407, lng: 90.56538359 },
        { lat: 23.7588160, lng: 90.52911986 },
        { lat: 23.7592645, lng: 90.42032866 },
        { lat: 23.7615071, lng: 90.38945549 },
        { lat: 23.7888633, lng: 90.36152261 }
    ];
//console.log(staticCoordinates);
    const dumpFills = [30, 25, 81, 45, 70, 50, 90, 60];

    React.useEffect(() => {
        getAllSTS();
    }, []);

    return <GoogleMapComponent coordinates={stsCoordinate} dumpFills={storagePercentage} />;
};

import { useState, useEffect } from 'react';
import axios from 'axios';
import { uri } from '@/data/constant';
import { jwtToken } from "@/data/cookieNames";
import { getCookie } from "@/lib/cookieFunctions";
import { apiRoutes } from '@/data/apiRoutes';
type STS = {
    id: string,
    name: string,
    wardNumber: string,
    capacity: string,
    currentTotalWaste: string,
    latitude: string,
    longitude: string,
    createdAt: string,
    updatedAt: string
};

type StsShow = {
   
    lat: number,
    lng: number,
};

type StsRouteType = {
    coordinate: string,
    name: string,
}

export default function useGetAllSTS() {  
    const [stsList, setSTSList] = useState<STS[]>([]); // Initialize with an empty array of STS objects
    const [storagePercentage, setStoragePercentage] = useState<number[]>([]); 
    const [stsCoordinate, setStsCoordinate] = useState<StsShow[]>([]);
    const [stsRoute, setStsRoute] = useState<StsRouteType[]>([]);

    async function getAllSTS() {
        try {
            const res = await axios.get(apiRoutes.sts.getAll, {
                headers: { Authorization: `Bearer ${getCookie(jwtToken)}` },
              });
            // Assuming the response data is an array of STS
            const AllSTS: STS[] = res.data.map((data: any) => ({
                id: data.id,
                name: data.name,
                wardNumber: data.wardNumber,
                capacity: data.capacity,
                currentTotalWaste: data.currentTotalWaste,
                latitude: data.latitude,
                longitude: data.longitude,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            }));

            const stsCoordinates: StsShow[] = AllSTS.map((data: STS) => ({
                lat: Number(data.latitude),
                lng: Number(data.longitude),
            }));

            // Calculate storage percentage for each STS
            const percentages: number[] = AllSTS.map((data: STS) => {
                const capacity = parseFloat(data.capacity);
                const currentTotalWaste = parseFloat(data.currentTotalWaste);
                const percentage = (currentTotalWaste / capacity) * 100;
                return parseFloat(percentage.toFixed(2));
            });
            
            const stsRouteCalc: StsRouteType[] = AllSTS.map((data: STS) => ({
                coordinate: `${data.latitude}, ${data.longitude}`,
                name: data.name
            }));

            setStsRoute(stsRouteCalc);

            setStsCoordinate(stsCoordinates);
            setSTSList(AllSTS);
            setStoragePercentage(percentages);

            return true;
        } catch (error: any) {
            alert(error.message?.toString() || "Error fetching STS list");
            return false;
        }
    }
    // useEffect(() => {
    //     console.log(storagePercentage);
    //     console.log(stsCoordinate);
    //     console.log(stsRoute);
    // }, [storagePercentage, stsCoordinate]);


    return { stsList, stsRoute, storagePercentage, stsCoordinate, getAllSTS };
}
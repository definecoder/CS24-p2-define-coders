import { useState } from 'react';
import axios from 'axios';
import { uri } from '@/data/constant';

type STS = {
    id: string,
    name: string,
    wardNumber: string,
    capacity: number,
    currentTotalWaste: number,
    latitude: string,
    longitude: string,
    createdAt: string,
    updatedAt: string
};
type StsShow = {
   
    latitude: string,
    longitude: string,
    storagePercentage: string
    
};

export default function useGetAllSTS() {  
  const [stsList, setSTSList] = useState<STS[]>([]); // Initialize with an empty array of Vehicle objects
  const [storagePercentage, setStoragePercentage] = useState<number[]>([]); 
  const [stsCoordinate, setStsCoordinate] = useState<StsShow[]>([]);

  async function getAllSTS() {
    try {
      const res = await axios.get('http://localhost:8585/sts');
      // Assuming the response data is an array of vehicles
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
      const calculatedPercentage: number[] = AllSTS.map((data: STS) => {
        const percentage = (data.currentTotalWaste / data.capacity) * 100;
        return parseFloat(percentage.toFixed(2)); // Convert to number with 2 decimal places
      });
      const stsCoordinates: string[] = res.data.map((data: STS, index: number) => {
        const coordinate = {
            lat: data.latitude,
            lng: data.longitude,
            storagePercentage: calculatedPercentage[index]
        }
      });
      setStsCoordinate(stsCoordinate);

     setSTSList(AllSTS);
     setStoragePercentage(calculatedPercentage);  
     
      return true;
    } catch (error: any) {
      alert(error.message?.toString() || "Error fetching vehicle list");
      return false;
    }
  }

  return { stsList, stsCoordinate, getAllSTS };
}

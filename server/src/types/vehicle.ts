export interface Vehicle {
  id?: string;
  vehicleNumber?: string;
  vehicleType?: string;
  capacity?: number;
  loadedFuelCostPerKm?: number;
  unloadedFuelCostPerKm?: number;
  currentLatitude?: number;
  currentLongitude?: number;
  landFillId?: string;
  duration?: number;
  distance?: number;
  createdAt?: Date;
  updatedAt?: Date;
  busyTime?: number;
  count?: number;
}

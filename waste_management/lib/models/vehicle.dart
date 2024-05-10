class Vehicle {
  String vehicleNumber;
  String vehicleType;
  int capacity;
  String landfillName;
  double unloadedCost;
  double loadedCost;

  Vehicle({
    required this.vehicleNumber,
    required this.vehicleType,
    required this.capacity,
    required this.landfillName,
    required this.unloadedCost,
    required this.loadedCost,
  });
}
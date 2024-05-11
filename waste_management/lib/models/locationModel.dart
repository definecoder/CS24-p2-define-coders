

class VehicleLocation {
  String latitude;
  String longitude;
  String vehicleid;
  VehicleLocation({
    required this.latitude,
    required this.longitude,
    required this.vehicleid,

  });
  factory VehicleLocation.fromJson(Map<String, dynamic> json){
    return VehicleLocation(latitude: json["latitude"],
        longitude: json["longitude"],
        vehicleid: json["vehicleid"]
    );
  }
}
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'package:waste_management/constants/theming.dart';
import 'package:waste_management/models/locationModel.dart';
import 'package:waste_management/screens/mapscreen/mapController.dart';
import 'package:get/get_state_manager/src/rx_flutter/rx_obx_widget.dart';

class GoogleMapLive extends StatefulWidget {
  const GoogleMapLive({Key? key}) : super(key: key);

  @override
  State<GoogleMapLive> createState() => _GoogleMapLiveState();
}

class _GoogleMapLiveState extends State<GoogleMapLive> {
  late GoogleMapController mapController;
  late IO.Socket socket;
  LatLng _center = const LatLng(23.7285964, 90.3986780);

  @override
  void initState() {
    super.initState();
    // Initialize socket connection
    socket = IO.io('${uri}',
        IO.OptionBuilder()
            .setTransports(['websocket'])
            .disableAutoConnect()
            .build());
    setUpSocketListener();
    socket.connect();
    joinedMap();
  }

  void setUpSocketListener() {
    // Listen for location updates from the server
    socket.on('location-update', (data) {
      setState(() {
        // Update map with new location data
        _center = LatLng(data['latitude'], data['longitude']);
      });
    });
  }

  void joinedMap(){

    var roomData = {
      "stsid": "1"
    };
    socket.emit('join_room', roomData);

  }

  void sendLocation(){
    var locationJson= {
      "latitude": "23.7285964",
      "longitude": "90.3986780",
      "vehicleid": "1"

    };
    var locationController = Get.find<LocationController>();
    locationController.locationNow.add(VehicleLocation.fromJson(locationJson));
    printLocation();
    socket.emit('mylocation',locationJson);

  }

  void printLocation() {
    var locationController = Get.find<LocationController>();
    for (var location in locationController.locationNow) {
      print("Latitude: ${location.latitude}, Longitude: ${location.longitude}, Vehicle ID: ${location.vehicleid}");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GoogleMap(
        onMapCreated: _onMapCreated,
        initialCameraPosition: CameraPosition(
          target: _center,
          zoom: 13,
        ),
        markers: {
          Marker(
            markerId: MarkerId('sourceLocation'),
            position: _center,
          ),
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Add your action here
          sendLocation();
        },
        child: Icon(Icons.add, color: ksecondaryHeaderColor,),
        backgroundColor: kPrimaryColor,
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endTop,
    );
  }

  void _onMapCreated(GoogleMapController controller) {
    mapController = controller;
  }

  @override
  void dispose() {
    // Disconnect socket when widget is disposed
    socket.disconnect();
    super.dispose();
  }
}

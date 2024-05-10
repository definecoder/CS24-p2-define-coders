import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class GoogleMapLive extends StatefulWidget {
  const GoogleMapLive({Key? key}) : super(key: key);

  @override
  State<GoogleMapLive> createState() => _GoogleMapLiveState();
}

class _GoogleMapLiveState extends State<GoogleMapLive> {
  late GoogleMapController mapController;
  LatLng _center = const LatLng(23.7285964, 90.3986780);

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
    );
  }

  void _onMapCreated(GoogleMapController controller) {
    mapController = controller;
  }
}

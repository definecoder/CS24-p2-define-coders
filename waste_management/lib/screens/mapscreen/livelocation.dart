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

  // Arrays to store locations
  List<LatLng> locations1 = [
    LatLng(23.728558623, 90.39670703),
    LatLng(23.73081768, 90.395338),
    LatLng(23.73011041, 90.39988282),
  ];

  List<LatLng> locations2 = [
    LatLng(23.726515698, 90.40380957),
    LatLng(23.73396056, 90.40108444),
    LatLng(23.731465857, 90.39252285),
  ];

  List<LatLng> locations3 = [
    LatLng(23.72268502, 90.40288698),
    LatLng(23.729776526, 90.40052636),
    LatLng(23.7292461, 90.40953878),
  ];

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
          // Markers for locations1
          for (int i = 0; i < locations1.length; i++)
            Marker(
              markerId: MarkerId('sourceLocation$i'),
              position: locations1[i],
              icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueBlue),
            ),
          // Markers for locations2
          for (int i = 0; i < locations2.length; i++)
            Marker(
              markerId: MarkerId('sourceLocation${i + locations1.length}'),
              position: locations2[i],
              icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueGreen),
            ),
          // Markers for locations3
          for (int i = 0; i < locations3.length; i++)
            Marker(
              markerId: MarkerId('sourceLocation${i + locations1.length + locations2.length}'),
              position: locations3[i],
              icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueRed),
            ),
        },
      ),
      // floatingActionButton: FloatingActionButton(
      //   onPressed: () {
      //     // Add your action here
      //     // sendLocation();
      //   },
      //   child: Icon(Icons.add),
      //   backgroundColor: Colors.blue,
      // ),
      // floatingActionButtonLocation: FloatingActionButtonLocation.endTop,
    );
  }

  void _onMapCreated(GoogleMapController controller) {
    mapController = controller;
  }
}

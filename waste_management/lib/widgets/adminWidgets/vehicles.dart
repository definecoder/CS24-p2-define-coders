import 'package:flutter/material.dart';
import 'package:waste_management/constants/theming.dart';
import 'package:waste_management/models/vehicle.dart';
import 'package:waste_management/widgets/adminWidgets/vehicleAdd.dart';



class VehicleDataTable extends StatelessWidget {
  final List<Vehicle> vehicles;

  const VehicleDataTable({Key? key, required this.vehicles}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            const Text("Vehicles",  style: TextStyle(
              fontFamily: 'Arial',
              fontSize: 17,
              fontWeight: FontWeight.bold,
              color: kPrimaryColor,
            ),),
            DataTable(
              columns: [
                DataColumn(label: Text('Number')),
                DataColumn(label: Text('Type')),
                DataColumn(label: Text('Cap')),
                DataColumn(label: Text('')),
              ],
              rows: vehicles.map((vehicle) {
                return DataRow(cells: [
                  DataCell(Text(vehicle.vehicleNumber)),
                  DataCell(Text(vehicle.vehicleType)),
                  DataCell(Text(vehicle.capacity.toString())),
                  DataCell(IconButton(
                    icon: Icon(Icons.remove_red_eye),
                    onPressed: () {
                      showDialog(
                        context: context,
                        builder: (BuildContext context) {
                          return AlertDialog(
                            title: Text('Vehicle Details'),
                            content: SingleChildScrollView(
                              child: ListBody(
                                children: <Widget>[
                                  Text('Vehicle Number: ${vehicle.vehicleNumber}'),
                                  Text('Vehicle Type: ${vehicle.vehicleType}'),
                                  Text('Capacity: ${vehicle.capacity}'),
                                  Text('Landfill Name: ${vehicle.landfillName}'),
                                  Text('Unloaded Cost: ${vehicle.unloadedCost}'),
                                  Text('Loaded Cost: ${vehicle.loadedCost}'),
                                ],
                              ),
                            ),
                            actions: <Widget>[
                              TextButton(
                                child: Text('Close'),
                                onPressed: () {
                                  Navigator.of(context).pop();
                                },
                              ),
                            ],
                          );
                        },
                      );
                    },
                  )),
                ]);
              }).toList(),
            ),
          ],
        ),

      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Add your action here
          showModalBottomSheet(
            context: context,
            isScrollControlled: true, // Make it cover full screen
            builder: (BuildContext context) {
              return VehicleAdd();
            },
          );
        },
        child: Icon(Icons.add, color: ksecondaryHeaderColor,),
        backgroundColor: kPrimaryColor,
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endTop,
    );
  }
}

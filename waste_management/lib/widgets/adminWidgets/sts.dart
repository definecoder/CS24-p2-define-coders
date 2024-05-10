import 'package:flutter/material.dart';

import 'package:waste_management/constants/theming.dart';
import 'package:waste_management/models/sts.dart';
import 'package:waste_management/models/vehicle.dart';
import 'package:waste_management/widgets/adminWidgets/stsAdd.dart';



class StsDataTable extends StatelessWidget {
  final List<Sts> stses;

  const StsDataTable({Key? key, required this.stses}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            const Text("STS Details",  style: TextStyle(
              fontFamily: 'Arial',
              fontSize: 17,
              fontWeight: FontWeight.bold,
              color: kPrimaryColor,
            ),),
            DataTable(
              columns: [
                DataColumn(label: Text('Title')),
                DataColumn(label: Text('Ward')),
                DataColumn(label: Text('Cap')),
                DataColumn(label: Text('')),
              ],
              rows: stses.map((sts) {
                return DataRow(cells: [
                  DataCell(Text(sts.stsName)),
                  DataCell(Text(sts.ward)),
                  DataCell(Text(sts.capacity.toString())),
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
                                  Text('Vehicle Number: ${sts.stsName}'),
                                  Text('Vehicle Type: ${sts.ward}'),
                                  Text('Capacity: ${sts.capacity}'),
                                  Text('Manager: ${sts.stsManager}'),

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
              return StsAdd();
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

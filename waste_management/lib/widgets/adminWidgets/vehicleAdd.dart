import 'package:flutter/material.dart';
import 'package:waste_management/constants/theming.dart';

class VehicleAdd extends StatelessWidget {
  // Define dropdown menu values
  final List<String> vehicleTypes = ['Car', 'Truck', 'Van', 'Motorcycle'];
  final List<String> landfillOptions = ['Landfill 1', 'Landfill 2', 'Landfill 3'];
  final List<String> stsOptions = ['STS 1', 'STS 2', 'STS 3'];
  Color CustomTextFieldColor = Color(0xff999a9e);
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Container(
        padding: EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Add Vehicle',
              style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold, color: kPrimaryColor),
            ),
            SizedBox(height: 20.0),
            TextFormField(
              decoration: InputDecoration(labelText: 'Vehicle Number',
                border: OutlineInputBorder(),
                enabledBorder: OutlineInputBorder(
                  borderSide: BorderSide(
                    width: 2,
                    color: CustomTextFieldColor, // Border color
                  ),
                ),
              ),
            ),
            SizedBox(height: 10.0),
            DropdownButtonFormField<String>(
              decoration: InputDecoration(labelText: 'Vehicle Type',
                border: OutlineInputBorder(),
                enabledBorder: OutlineInputBorder(
                  borderSide: BorderSide(
                    width: 2,
                    color: CustomTextFieldColor, // Border color
                  ),
                ),
              ),
              items: vehicleTypes.map((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value),
                );
              }).toList(),
              onChanged: (String? value) {},
            ),
            SizedBox(height: 10.0),
            TextFormField(
              decoration: InputDecoration(labelText: 'Fuel Cost',
                border: OutlineInputBorder(),
                enabledBorder: OutlineInputBorder(
                  borderSide: BorderSide(
                    width: 2,
                    color: CustomTextFieldColor, // Border color
                  ),
                ),
              ),
              keyboardType: TextInputType.number,
            ),
            SizedBox(height: 10.0),
            DropdownButtonFormField<String>(
              decoration: InputDecoration(labelText: 'Landfill',
                border: OutlineInputBorder(),
                enabledBorder: OutlineInputBorder(
                  borderSide: BorderSide(
                    width: 2,
                    color: CustomTextFieldColor, // Border color
                  ),
                ),
              ),
              items: landfillOptions.map((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value),
                );
              }).toList(),
              onChanged: (String? value) {},
            ),
            SizedBox(height: 10.0),
            DropdownButtonFormField<String>(
              decoration: InputDecoration(labelText: 'STS', border: OutlineInputBorder(),
                enabledBorder: OutlineInputBorder(
                  borderSide: BorderSide(
                    width: 2,
                    color: CustomTextFieldColor, // Border color
                  ),
                ),),
              items: stsOptions.map((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value),
                );
              }).toList(),
              onChanged: (String? value) {},
            ),
            SizedBox(height: 20.0),
            Center(
              child: ElevatedButton(
                onPressed: () {
                  // Add your action here
                  Navigator.of(context).pop();
                },
                style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.all(kPrimaryColor)
                ),
                child: Text('Save', style: TextStyle(color: ksecondaryHeaderColor),),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
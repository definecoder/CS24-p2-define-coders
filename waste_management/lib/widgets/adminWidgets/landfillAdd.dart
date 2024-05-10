import 'package:flutter/material.dart';
import 'package:waste_management/constants/theming.dart';

class LandfillAdd extends StatelessWidget {
  Color CustomTextFieldColor = const Color(0xff999a9e);
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Container(
        padding:const  EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const  Text(
              'Add Landfill',
              style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
            ),
            const  SizedBox(height: 20.0),
            TextFormField(
              decoration: InputDecoration(
                labelText: 'Landfill Name',
                border: OutlineInputBorder(),
                enabledBorder: OutlineInputBorder(
                  borderSide: BorderSide(
                    width: 2,
                    color: CustomTextFieldColor, // Border color
                  ),
                ),
              ),
            ),
            const  SizedBox(height: 10.0),
            TextFormField(
              decoration: InputDecoration(
                labelText: 'Capacity',
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
            const SizedBox(height: 10.0),
            TextFormField(
              decoration: InputDecoration(
                labelText: 'Location Name',
                border: OutlineInputBorder(),
                enabledBorder: OutlineInputBorder(
                  borderSide: BorderSide(
                    width: 2,
                    color: CustomTextFieldColor, // Border color
                  ),
                ),
              ),
            ),
            const  SizedBox(height: 10.0),
            TextFormField(
              decoration: InputDecoration(
                labelText: 'Latitude',
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
            const  SizedBox(height: 10.0),
            TextFormField(
              decoration: InputDecoration(
                labelText: 'Longitude',
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
            const SizedBox(height: 20.0),
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
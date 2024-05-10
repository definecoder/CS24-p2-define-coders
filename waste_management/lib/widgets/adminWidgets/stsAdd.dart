import 'package:flutter/material.dart';
import 'package:waste_management/constants/theming.dart';

class StsAdd extends StatelessWidget {
  Color CustomTextFieldColor = Color(0xff999a9e);
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Container(
        padding: EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const  Text(
              'Add Station',
              style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold, color: kPrimaryColor),
            ),
            SizedBox(height: 20.0),
            TextFormField(
              decoration:  InputDecoration(labelText: 'STS Name',
                border: OutlineInputBorder(),
                enabledBorder: OutlineInputBorder(
                  borderSide: BorderSide(
                    width: 2,
                    color: CustomTextFieldColor, // Border color
                  ),
                ),
              ),
            ),
            const SizedBox(height: 10.0),
            TextFormField(
              decoration:  InputDecoration(labelText: 'Ward Number',
                border: OutlineInputBorder(),
                enabledBorder: OutlineInputBorder(
                  borderSide: BorderSide(
                    width: 2,
                    color: CustomTextFieldColor, // Border color
                  ),
                ),
              ),
            ),
            const SizedBox(height: 10.0),
            TextFormField(
              decoration:  InputDecoration(labelText: 'Capacity',
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
              decoration:  InputDecoration(labelText: 'Location Name',
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
              decoration:  InputDecoration(labelText: 'Latitude',
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
              decoration:  InputDecoration(labelText: 'Longitude',
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
// prompt
// write code for open bottom sheet when floating action button is pressed. the bottom sheet should contain: STS name input field, ward number input field,  capacity input field,  location name input field,  latitude input field,longitude input field. the bottom sheet should cover full screen.
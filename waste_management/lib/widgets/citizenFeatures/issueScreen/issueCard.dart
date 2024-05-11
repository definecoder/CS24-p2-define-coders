import 'package:flutter/material.dart';

class IssueCard extends StatelessWidget {
  final String id;
  final String type;
  final String issuePic;
  final String description;
  final String latitude;
  final String longitude;


  IssueCard({
    required this.id,
    required this.type,
    required this.issuePic,
    required this.description,
    required this.latitude,
    required this.longitude,

  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 3,
      margin: EdgeInsets.all(10),
      child: Padding(
        padding: EdgeInsets.all(10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: EdgeInsets.symmetric(horizontal: 10, vertical: 5),
              decoration: BoxDecoration(
                color: Colors.blue,
                borderRadius: BorderRadius.circular(20),
              ),
              child: Text(
                type,
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            SizedBox(height: 10),
            Text(
              'Latitude: $latitude, Longitude: $longitude',
              style: TextStyle(
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 10),
            Text(description),
            SizedBox(height: 10),
            Image.asset(
              issuePic,
              height: 150,
              width: double.infinity,
              fit: BoxFit.cover,
            ),
          ],
        ),
      ),
    );
  }
}

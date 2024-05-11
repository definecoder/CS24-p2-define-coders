import 'package:flutter/material.dart';
import 'package:waste_management/models/issueModel.dart';
import 'package:waste_management/services/auth_service.dart';

class IssuePage extends StatefulWidget {
  final Function(Issue) addIssue; // Function to add issue

  IssuePage({required this.addIssue});

  @override
  _IssuePageState createState() => _IssuePageState();
}

class _IssuePageState extends State<IssuePage> {
  final TextEditingController _latitudeController = TextEditingController();
  final TextEditingController _longitudeController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();

  String? _selectedIssue;
  bool _isAnonymous = false;
  final AuthServices authService = AuthServices();

  void _submitIssue(BuildContext context) {
    authService.issuePost(
        context: context,
        type: _selectedIssue!,
        description: _descriptionController.text,
         latitude: _latitudeController.text,
    longitude: _longitudeController.text,
        isAnonymous: _isAnonymous
    );
    // Create a new Issue object with the provided data
    Issue newIssue = Issue(
      id: DateTime.now().toString(), // Unique ID based on timestamp
      type: _selectedIssue!,
      issuePic: "assets/images/garbage9.png", // Default image path, you can change it as needed
      description: _descriptionController.text,
      latitude: _latitudeController.text,
      longitude: _longitudeController.text,
      isAnonymous: _isAnonymous,
    );

    // Call the addIssue function passed from IssueFeed
    widget.addIssue(newIssue);

    // Reset fields after submission
    _latitudeController.clear();
    _longitudeController.clear();
    _descriptionController.clear();
    _selectedIssue = null;
    _isAnonymous = false;

    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Issue Reporting'),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _buildIssueDropdown(),
            SizedBox(height: 20),
            _buildLocationField(),
            SizedBox(height: 20),
            _buildDescriptionField(),
            SizedBox(height: 20),
            _buildPhotoAttachmentField(),
            SizedBox(height: 20),
            _buildAnonymousOption(),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: (){
                _submitIssue(context);
              },
              child: Text('Submit'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildIssueDropdown() {
    return Container(
      padding: EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.5),
            spreadRadius: 2,
            blurRadius: 5,
            offset: Offset(0, 3),
          ),
        ],
      ),

      child: DropdownButtonFormField<String>(
        value: _selectedIssue,
        onChanged: (value) {
          setState(() {
            _selectedIssue = value;
          });
        },
        decoration: InputDecoration(
          labelText: 'Select Issue',
          border: OutlineInputBorder(),
        ),
        items: [
          'Overflowing bins',
          'Littering',
          'Illegal dumping',
          'Damaged infrastructure',
          'Others'
        ].map((issue) {
          return DropdownMenuItem(
            value: issue,
            child: Text(issue),
          );
        }).toList(),
      ),
    );
  }

  Widget _buildLocationField() {
    return Container(
      padding: EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.5),
            spreadRadius: 2,
            blurRadius: 5,
            offset: Offset(0, 3),
          ),
        ],
        borderRadius: BorderRadius.all(Radius.circular(12)),
      ),
      child: Row(
        children: [
          Expanded(
            child: Container(
              padding: EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: Colors.white,
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.5),
                    spreadRadius: 2,
                    blurRadius: 5,
                    offset: Offset(0, 3),
                  ),
                ],
                borderRadius: BorderRadius.all(Radius.circular(12)),
              ),
              child: TextField(
                controller: _latitudeController,
                decoration: InputDecoration(
                  labelText: 'Latitude',
                  border: OutlineInputBorder(),
                ),
              ),
            ),
          ),
          SizedBox(width: 10),
          Expanded(
            child: Container(
              padding: EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: Colors.white,
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.5),
                    spreadRadius: 2,
                    blurRadius: 5,
                    offset: Offset(0, 3),
                  ),
                ],
                borderRadius: BorderRadius.all(Radius.circular(12)),
              ),
              child: TextField(
                controller: _longitudeController,
                decoration: InputDecoration(
                  labelText: 'Longitude',
                  border: OutlineInputBorder(),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }


  Widget _buildDescriptionField() {
    return Container(
      padding: EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.5),
            spreadRadius: 2,
            blurRadius: 5,
            offset: Offset(0, 3),
          ),
        ],
      ),
      child: TextField(
        controller: _descriptionController,
        maxLines: 3,
        decoration: InputDecoration(
          labelText: 'Description',
          border: OutlineInputBorder(),
        ),
      ),
    );
  }

  Widget _buildPhotoAttachmentField() {
    return Container(
      padding: EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.5),
            spreadRadius: 2,
            blurRadius: 5,
            offset: Offset(0, 3),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text('Photo Attachment'),
          SizedBox(height: 10),
          ElevatedButton(
            onPressed: () {
              // Add functionality to attach photo
            },
            child: Text('Attach Photo'),
          ),
        ],
      ),
    );
  }

  Widget _buildAnonymousOption() {
    return Container(
      padding: EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.5),
            spreadRadius: 2,
            blurRadius: 5,
            offset: Offset(0, 3),
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text('Anonymous Reporting'),
          Switch(
            value: _isAnonymous,
            onChanged: (value) {
              setState(() {
                _isAnonymous = value;
              });
            },
          ),
        ],
      ),
    );
  }


}



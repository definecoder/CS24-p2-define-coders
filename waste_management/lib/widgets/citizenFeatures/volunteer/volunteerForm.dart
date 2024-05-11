import 'package:flutter/material.dart';

class VolunteerForm extends StatefulWidget {
  @override
  _VolunteerFormState createState() => _VolunteerFormState();
}

class _VolunteerFormState extends State<VolunteerForm> {
  final TextEditingController _latitudeController = TextEditingController();
  final TextEditingController _longitudeController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();

  String? _selectedIssue;
  bool _isAnonymous = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Volunteer Request'),
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
            ElevatedButton(
              onPressed: _submitIssue,
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
          labelText: 'Select Volunteer Type',
          border: OutlineInputBorder(),
        ),
        items: [
          'Regular',
          'Monthly Volunteer',
          'Weekly Volunteer',

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
      child: Expanded(
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
              labelText: 'Location Area',
              border: OutlineInputBorder(),
            ),
          ),
        ),
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
          labelText: 'Describe Yourself',
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



  void _submitIssue() {
    // Implement submission logic here
    print('Issue: $_selectedIssue');
    print('Location: ${_latitudeController.text}   longL: ${_longitudeController}');
    print('Description: ${_descriptionController.text}');
    print('Anonymous: $_isAnonymous');
    // Reset fields after submission if needed
    _latitudeController.clear();
    _longitudeController.clear();
    _descriptionController.clear();
    _selectedIssue = null;
    _isAnonymous = false;
  }
}



import 'package:flutter/material.dart';
import 'package:waste_management/models/issueModel.dart';
import 'package:waste_management/widgets/citizenFeatures/issueScreen/issueCard.dart';
import 'package:waste_management/widgets/citizenFeatures/issueScreen/issueScreen.dart';
// Import the IssueCard widget
// Import the Forum class

class IssueFeed extends StatefulWidget {


  @override
  State<IssueFeed> createState() => _IssueFeedState();
}

class _IssueFeedState extends State<IssueFeed> {
  List<Issue> dummyIssues = [
    Issue(
      id: '1',
      type: 'Overflowing bins',
      issuePic: "assets/images/garbage7.png",
      description: 'Overflowing bins on the street corner',
      latitude: '23.789',
      longitude: '90.412',
      isAnonymous: false,
    ),
    Issue(
      id: '2',
      type: 'Littering',
      issuePic: "assets/images/garbage8.png",
      description: 'Public littering near the park',
      latitude: '23.791',
      longitude: '90.415',
      isAnonymous: false,
    ),
  ];

  void AddIssue(Issue newIssue){
    setState(() {
      dummyIssues.add(newIssue);
    });
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView.builder(
        itemCount: dummyIssues.length,
        itemBuilder: (context, index) {
          final issue = dummyIssues[index];
          return IssueCard(
            id: issue.id,
            type: issue.type,
            issuePic: issue.issuePic,
            description: issue.description,
            latitude: issue.latitude,
            longitude: issue.longitude,
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Add your action here
          Navigator.push(
              context,

              MaterialPageRoute(builder: (context) => IssuePage(addIssue: AddIssue),));
        },
        child: Row(
          children: [
            Icon(Icons.add),
            Text("New")
          ],
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
    );
  }
}

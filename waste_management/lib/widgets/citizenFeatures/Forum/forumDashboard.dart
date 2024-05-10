import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:waste_management/constants/theming.dart';
import 'package:waste_management/models/forumModel.dart';
import 'package:waste_management/widgets/citizenFeatures/Forum/forumWidgets.dart';

class ForumDashboard extends StatefulWidget {
  const ForumDashboard({super.key});

  @override
  State<ForumDashboard> createState() => _ForumDashboardState();
}

class _ForumDashboardState extends State<ForumDashboard> {
  List<Forum> forumListing = [];
  String? _filePath;

  Future<void> _pickFile() async {
    final filePath = await FilePicker.platform.pickFiles();//.then((value) => value!.files.first.path);
    //print(filePath.toString());
  }

  @override
  void initState() {
    super.initState();
    forumListing = dummyForumList;

  }

  @override
  Widget build(BuildContext context) {

    Widget content = Expanded(
      child: ListView.builder(
          itemCount: dummyForumList.length,
          itemBuilder: (context, index) {
            Forum forum = dummyForumList[index];
            return ProfileCard(
              id: forum.id,
              name: forum.name,
              profilePic: forum.profilePic,
              question: forum.question,
              support_area: forum.supportArea,
              description: forum.description,
              location: forum.location,
              upvote: forum.upvote,
              downvote: forum.downvote,
              comment: forum.comment,
              imgList: forum.imgList,
              comment1: forum.comment1,
              comment2: forum.comment2,
              commentPic1: forum.commentPic1,
              commentPic2: forum.commentPic2,
            );
          }
      ),
    );






    return Scaffold(
      body: Column(
        children: [
      Container(
      padding: EdgeInsets.all(8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          CircleAvatar(
            radius: 20,
            backgroundImage: AssetImage("assets/images/propic3.png"),
          ),
          SizedBox(width: 10),
          Expanded(
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 12),
              decoration: BoxDecoration(
                color: Colors.grey[200],
                borderRadius: BorderRadius.circular(20),
              ),
              child: TextField(
                decoration: InputDecoration(
                  border: InputBorder.none,
                  hintText: 'Write your forum post...',
                ),
              ),
            ),
          ),
          SizedBox(width: 10),
          // IconButton(
          //   icon: Icon(Icons.send),
          //   onPressed: () {
          //     // Add send message functionality here
          //   },
          // ),

        ],
      ),
    ),
          Padding(
            padding: const EdgeInsets.only(left:12.0, right: 12.0),
            child: Container(

              child: Row(
                children: [
                  Container(
                    decoration: BoxDecoration(
                      color: Colors.grey[200],
                      borderRadius: BorderRadius.circular(10), // Set the border radius
                    ),

                    child: Padding(
                      padding: const EdgeInsets.only(right: 12.0),
                      child: Row(children: [
                      IconButton(
                        icon: Icon(Icons.photo_library),
                        onPressed: _pickFile,
                      ),
                      Text("Add Photo/file", style: TextStyle(fontSize: 14),)

                                      ]
                      ,),
                    ),
                  ),

                  SizedBox(width: 10),
                  Expanded(
                    child: Container(
                      padding: EdgeInsets.symmetric(horizontal: 12),
                      decoration: BoxDecoration(
                        color: Colors.grey[200],
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: TextField(
                        decoration: InputDecoration(
                          border: InputBorder.none,
                          hintText: 'Location',
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
    Padding(
      padding: const EdgeInsets.all( 8.0),
      child: SizedBox(
      width: MediaQuery.of(context).size.width,
      child: ElevatedButton(
      onPressed: () {
      print('Hello World');
      },
      style: ElevatedButton.styleFrom(
      backgroundColor: kPrimaryLightColor,
      shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(10.0),
      ),
      ),
      child: Text(
      'Post',
      style: TextStyle(fontSize: 18, color: ksecondaryHeaderColor),
      ),
      ),
      ),
    ),



          content,
        ],
      )

    );
  }
}
